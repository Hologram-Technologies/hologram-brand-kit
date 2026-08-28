#!/usr/bin/env node
// shoot-screens.mjs — renders every registered product screen to
// brand/product/<feature>/screens/<screen>.png at 1440 width via headless
// Edge. Builds the showcase (image gate deferred), serves dist, shoots, exits.
//
//   node shoot-screens.mjs

import { execSync, spawn } from "node:child_process";
import { readFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const brand = join(here, "..");
const showcase = join(brand, "showcase");

const EDGE = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((p) => { try { statSync(p); return true; } catch { return false; } });
if (!EDGE) { console.error("headless Edge not found"); process.exit(1); }

const registry = readFileSync(join(showcase, "src", "screens", "index.ts"), "utf8");
const entries = [...registry.matchAll(/feature:\s*"([^"]+)",\s*screen:\s*"([^"]+)"/g)]
  .map((m) => ({ feature: m[1], screen: m[2] }));
if (!entries.length) { console.log("no screens registered"); process.exit(0); }

console.log("building showcase (image gate deferred)");
execSync("npm run build", { cwd: showcase, stdio: "inherit", env: { ...process.env, HOLO_SHOOTING: "1" } });

const PORT = 4179;
const server = spawn("npm", ["run", "preview", "--", "--port", String(PORT), "--strictPort"],
  { cwd: showcase, shell: true, stdio: "ignore" });
try {
  await new Promise((resolve, reject) => {
    const t0 = Date.now();
    const poll = async () => {
      try { await fetch(`http://localhost:${PORT}/hologram-brand-kit/`); resolve(null); }
      catch { Date.now() - t0 > 30000 ? reject(new Error("preview timeout")) : setTimeout(poll, 500); }
    };
    poll();
  });
  for (const { feature, screen } of entries) {
    const out = join(brand, "product", feature, "screens", `${screen}.png`);
    mkdirSync(dirname(out), { recursive: true });
    const url = `http://localhost:${PORT}/hologram-brand-kit/#/screens/${feature}/${screen}`;
    execSync(`"${EDGE}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 ` +
      `--virtual-time-budget=8000 --screenshot="${out}" "${url}"`, { stdio: "ignore" });
    console.log(`shot ${feature}/${screen} → ${out}`);
  }
} finally {
  server.kill();
  try { execSync(`taskkill /F /T /PID ${server.pid}`, { stdio: "ignore" }); } catch {}
}
console.log(`done: ${entries.length} screens`);
