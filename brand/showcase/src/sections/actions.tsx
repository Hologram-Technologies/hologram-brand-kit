import { Cell, Section } from "../App";
import { Button } from "@/registry/new-york-v4/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/registry/new-york-v4/ui/button-group";
import { Toggle } from "@/registry/new-york-v4/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/registry/new-york-v4/ui/toggle-group";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu";
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
} from "@/registry/new-york-v4/ui/context-menu";
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger,
} from "@/registry/new-york-v4/ui/menubar";
import { Kbd, KbdGroup } from "@/registry/new-york-v4/ui/kbd";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/registry/new-york-v4/ui/command";
import { Bold, Italic, Underline, ChevronDown } from "lucide-react";

export function Actions() {
  return (
    <Section id="actions" title="Actions">
      <Cell title="Button">
        <div className="flex flex-wrap gap-2">
          <Button>Verify node</Button>
          <Button variant="secondary">Duplicate</Button>
          <Button variant="outline">Export</Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="destructive">Revoke key</Button>
        </div>
      </Cell>
      <Cell title="Button group and toggles">
        <ButtonGroup>
          <Button variant="outline">Pin</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Share</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">
            More <ChevronDown data-icon="inline-end" />
          </Button>
        </ButtonGroup>
        <div className="flex items-center gap-4">
          <ToggleGroup type="multiple" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
          </ToggleGroup>
          <Toggle variant="outline" aria-label="Watch">Watch</Toggle>
        </div>
      </Cell>
      <Cell title="Menus">
        <div className="flex flex-wrap items-center gap-3">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New space</MenubarItem>
                <MenubarItem>Open recent</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Seal and sign</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom in</MenubarItem>
                <MenubarItem>Zoom out</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Node actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>desk-7f3a</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Restart</DropdownMenuItem>
              <DropdownMenuItem>Rotate address</DropdownMenuItem>
              <DropdownMenuItem>Detach</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-16 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            Right click this region
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy address</ContextMenuItem>
            <ContextMenuItem>Inspect object</ContextMenuItem>
            <ContextMenuItem>Teleport</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Cell>
      <Cell title="Command" wide>
        <Command className="rounded-lg border">
          <CommandInput placeholder="Search the space" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Objects">
              <CommandItem>boot.holo</CommandItem>
              <CommandItem>desktop.strand</CommandItem>
              <CommandItem>q-mind.pack</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Cell>
      <Cell title="Keyboard">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Open the command bar</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      </Cell>
    </Section>
  );
}
