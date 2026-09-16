import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card";
import { Progress } from "@/registry/new-york-v4/ui/progress";
import { Spinner } from "@/registry/new-york-v4/ui/spinner";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import { CheckCircle2 } from "lucide-react";

export function Verifying() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-display text-xl flex items-center gap-3">
            <Spinner /> Verifying devices
          </CardTitle>
          <CardDescription>
            phone-c221 and desk-7f3a are proving they hold the same space.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Progress value={66} aria-label="Verification progress" />
          <div className="flex flex-col gap-3 text-sm">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-muted-foreground" /> Code accepted
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-muted-foreground" /> Keys exchanged
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Spinner className="size-4" /> Recomputing the space address on both devices
            </p>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Pairing never sends your data through a server.
            The two devices verify each other directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
