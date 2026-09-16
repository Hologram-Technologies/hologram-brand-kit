import { Cell, Section } from "../App";
import { Alert, AlertDescription, AlertTitle } from "@/registry/new-york-v4/ui/alert";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york-v4/ui/alert-dialog";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Spinner } from "@/registry/new-york-v4/ui/spinner";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip";
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from "@/registry/new-york-v4/ui/hover-card";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export function Feedback() {
  return (
    <Section id="feedback" title="Feedback">
      <Cell title="Alert">
        <Alert>
          <ShieldCheck />
          <AlertTitle>Seal verified</AlertTitle>
          <AlertDescription>
            The release matches its address on every pinned device.
          </AlertDescription>
        </Alert>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner /> Verifying q-mind.pack
        </div>
      </Cell>
      <Cell title="Confirm and toast">
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Detach device</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Detach phone-c221</AlertDialogTitle>
                <AlertDialogDescription>
                  The device keeps its local copy but stops receiving updates.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep attached</AlertDialogCancel>
                <AlertDialogAction>Detach</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            variant="outline"
            onClick={() => toast("Snapshot sealed", { description: "did:holo:blake3:9f2a is pinned." })}
          >
            Seal snapshot
          </Button>
        </div>
      </Cell>
      <Cell title="Hints">
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Verified 6 minutes ago</TooltipContent>
            </Tooltip>
            <HoverCard>
              <HoverCardTrigger className="text-sm underline underline-offset-4 cursor-default">
                vps-contabo
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                4 vCPU, 7.8 GB, Frankfurt. Holds the team rail and nightly backups.
              </HoverCardContent>
            </HoverCard>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="text-sm w-64">
                Pinned objects stay available offline on this device.
              </PopoverContent>
            </Popover>
          </div>
        </TooltipProvider>
      </Cell>
    </Section>
  );
}
