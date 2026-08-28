import { Cell, Section } from "../App";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/registry/new-york-v4/ui/sheet";
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/registry/new-york-v4/ui/drawer";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";

export function Overlays() {
  return (
    <Section id="overlays" title="Overlays">
      <Cell title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Rename space</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename space</DialogTitle>
              <DialogDescription>The address stays the same; only the label changes.</DialogDescription>
            </DialogHeader>
            <Input defaultValue="research-notes" />
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Cell>
      <Cell title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open device panel</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>desk-7f3a</SheetTitle>
              <SheetDescription>
                Primary device. Holds 412 sealed objects and the signing key.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Cell>
      <Cell title="Drawer">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Show transfer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Teleporting wallpapers.set</DrawerTitle>
              <DrawerDescription>12.1 MB to phone-c221 over the local link.</DrawerDescription>
            </DrawerHeader>
            <div className="h-16" />
          </DrawerContent>
        </Drawer>
      </Cell>
    </Section>
  );
}
