import { useState } from "react";
import { DirectionProvider } from "@/registry/new-york-v4/ui/direction";
import { Toaster } from "@/registry/new-york-v4/ui/sonner";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Actions } from "./sections/actions";
import { Forms } from "./sections/forms";
import { DataSection } from "./sections/data";
import { Feedback } from "./sections/feedback";
import { Navigation } from "./sections/navigation";
import { Overlays } from "./sections/overlays";
import { Chat } from "./sections/chat";
import { Charts } from "./sections/charts";

export function Cell({ title, children, wide = false }: {
  title: string; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <div className={`rounded-xl border bg-card p-6 flex flex-col gap-4 min-w-0 ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-sm text-muted-foreground">{title}</span>
      <div className="flex flex-col gap-4 min-w-0">{children}</div>
    </div>
  );
}

export function Section({ id, title, children }: {
  id: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{children}</div>
    </section>
  );
}

function markUrl(file: string) {
  return `${import.meta.env.BASE_URL}${file}`;
}

export default function App() {
  const [dark, setDark] = useState(true);
  const toggle = () => {
    document.documentElement.classList.toggle("dark", !dark);
    setDark(!dark);
  };
  return (
    <DirectionProvider>
      <div className="mx-auto max-w-[1400px] px-6 py-12 flex flex-col gap-16">
        <header className="flex flex-col items-center gap-6 py-10 text-center">
          <img src={markUrl("logomark.svg")} alt="" className="h-20 w-20 dark:block hidden" />
          <img src={markUrl("logomark-black.svg")} alt="" className="h-20 w-20 dark:hidden block" />
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-[-0.03em] max-w-3xl">
            The Hologram design system
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            Every component in the library, rendered on the warm ground.
            One accent. Hairlines, not shadows.
          </p>
          <div className="flex items-center gap-3">
            <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
              Use the kit
            </Button>
            <Button size="lg" variant="secondary" onClick={toggle}>
              {dark ? "Paper mode" : "Dark mode"}
            </Button>
          </div>
        </header>
        <Actions />
        <Forms />
        <DataSection />
        <Charts />
        <Feedback />
        <Navigation />
        <Overlays />
        <Chat />
        <footer className="border-t pt-8 pb-4 text-sm text-muted-foreground flex justify-between">
          <span>Hologram Brand System</span>
          <a className="hover:text-foreground" href="https://github.com/Hologram-Technologies/hologram-brand-kit">
            github.com/Hologram-Technologies/hologram-brand-kit
          </a>
        </footer>
      </div>
      <Toaster />
    </DirectionProvider>
  );
}
