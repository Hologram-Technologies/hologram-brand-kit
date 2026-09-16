import { Cell, Section } from "../App";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/registry/new-york-v4/ui/table";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card";
import { Avatar, AvatarFallback } from "@/registry/new-york-v4/ui/avatar";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area";
import { AspectRatio } from "@/registry/new-york-v4/ui/aspect-ratio";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/registry/new-york-v4/ui/carousel";
import {
  Item, ItemContent, ItemDescription, ItemMedia, ItemTitle,
} from "@/registry/new-york-v4/ui/item";
import {
  Attachment, AttachmentContent, AttachmentDescription, AttachmentTitle,
} from "@/registry/new-york-v4/ui/attachment";
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import { Progress } from "@/registry/new-york-v4/ui/progress";
import {
  ResizablePanel, ResizablePanelGroup, ResizableHandle,
} from "@/registry/new-york-v4/ui/resizable";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/new-york-v4/ui/marker";
import {
  Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@/registry/new-york-v4/ui/empty";
import { Button } from "@/registry/new-york-v4/ui/button";
import { FileBox, Globe, Inbox } from "lucide-react";

const OBJECTS = [
  ["boot.holo", "sealed", "1.2 MB"],
  ["desktop.strand", "sealed", "348 KB"],
  ["q-mind.pack", "verifying", "4.7 MB"],
  ["wallpapers.set", "sealed", "12.1 MB"],
];

export function DataSection() {
  return (
    <Section id="data" title="Data">
      <Cell title="Table" wide>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Object</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OBJECTS.map(([name, state, size]) => (
              <TableRow key={name}>
                <TableCell className="font-mono">{name}</TableCell>
                <TableCell>
                  <Badge variant={state === "sealed" ? "secondary" : "outline"}>{state}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Cell>
      <Cell title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Nightly snapshot</CardTitle>
            <CardDescription>Sealed at 03:25, verified on two devices.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>IP</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p>Ilya Paveliev</p>
              <p className="text-muted-foreground">Owner</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Restore</Button>
          </CardFooter>
        </Card>
      </Cell>
      <Cell title="Progress and loading">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span>Replicating to vps-contabo</span>
            <span className="text-muted-foreground">64 percent</span>
          </div>
          <Progress value={64} />
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      </Cell>
      <Cell title="Lists">
        <Item variant="outline">
          <ItemMedia variant="icon"><FileBox /></ItemMedia>
          <ItemContent>
            <ItemTitle>readalong.syncmap</ItemTitle>
            <ItemDescription>Pinned on three devices</ItemDescription>
          </ItemContent>
        </Item>
        <Attachment>
          <AttachmentContent>
            <AttachmentTitle>hologram-tokens.zip</AttachmentTitle>
            <AttachmentDescription>21 KB, ready to import</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <div className="flex items-center gap-2">
          <Marker>
            <MarkerIcon><Globe /></MarkerIcon>
            <MarkerContent>frankfurt</MarkerContent>
          </Marker>
          <Marker variant="secondary">
            <MarkerContent>3 peers</MarkerContent>
          </Marker>
        </div>
      </Cell>
      <Cell title="Media">
        <AspectRatio ratio={16 / 9} className="rounded-lg border bg-secondary grid place-items-center text-sm text-muted-foreground">
          16 by 9 media frame
        </AspectRatio>
        <Carousel className="w-full px-10">
          <CarouselContent>
            {["Boot", "Desk", "Space", "Verify"].map((s) => (
              <CarouselItem key={s} className="basis-1/2">
                <div className="rounded-lg border bg-secondary h-20 grid place-items-center text-sm">{s}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </Cell>
      <Cell title="Panes and empty state">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border min-h-28">
          <ResizablePanel defaultSize={40} className="grid place-items-center text-sm text-muted-foreground">tree</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="grid place-items-center text-sm text-muted-foreground">editor</ResizablePanel>
        </ResizablePanelGroup>
        <ScrollArea className="h-24 rounded-lg border p-3 text-sm">
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i} className="py-1 font-mono text-muted-foreground">seal 2026.08.{String(19 + i).padStart(2, "0")} verified</p>
          ))}
        </ScrollArea>
        <Empty className="border rounded-lg">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
            <EmptyTitle>No shared spaces yet</EmptyTitle>
            <EmptyDescription>Invite a teammate to start one together.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Cell>
    </Section>
  );
}
