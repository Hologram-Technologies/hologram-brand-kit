import { SCREENS } from "./screens";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card";

export function ScreensIndex() {
  const features = [...new Set(SCREENS.map((s) => s.feature))];
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Product screens</h1>
        <p className="text-muted-foreground pt-2">
          Live wireframes, one route per screen. Specs live in brand/product.
        </p>
      </div>
      {features.map((feature) => (
        <Card key={feature}>
          <CardHeader>
            <CardTitle className="font-mono text-base">{feature}</CardTitle>
            <CardDescription>
              <a
                className="underline underline-offset-4 hover:text-foreground"
                href={`https://github.com/Hologram-Technologies/hologram-brand-kit/blob/develop/brand/product/${feature}/spec.md`}
              >
                Read the spec
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {SCREENS.filter((s) => s.feature === feature).map((s) => (
              <a
                key={s.screen}
                href={`#/screens/${s.feature}/${s.screen}`}
                className="flex justify-between rounded-lg border px-4 py-3 text-sm hover:bg-secondary"
              >
                <span>{s.title}</span>
                <span className="text-muted-foreground font-mono">{s.screen}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      ))}
      <a href="#/" className="text-sm text-muted-foreground hover:text-foreground">
        Back to the library
      </a>
    </div>
  );
}
