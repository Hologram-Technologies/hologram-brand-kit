import { Cell, Section } from "../App";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york-v4/ui/breadcrumb";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/registry/new-york-v4/ui/navigation-menu";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious,
} from "@/registry/new-york-v4/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar";
import { Button } from "@/registry/new-york-v4/ui/button";
import { ChevronsUpDown, Files, MessageSquare, Music, Tv } from "lucide-react";

export function Navigation() {
  return (
    <Section id="navigation" title="Navigation">
      <Cell title="Paths">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Space</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Library</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>readalong.syncmap</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-56 gap-1 p-1">
                  <NavigationMenuLink href="#">Files</NavigationMenuLink>
                  <NavigationMenuLink href="#">Messenger</NavigationMenuLink>
                  <NavigationMenuLink href="#">Holo TV</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="px-3 py-2">Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Cell>
      <Cell title="Tabs and disclosure">
        <Tabs defaultValue="objects">
          <TabsList>
            <TabsTrigger value="objects">Objects</TabsTrigger>
            <TabsTrigger value="peers">Peers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="objects" className="text-sm text-muted-foreground pt-2">
            4 sealed objects on this device.
          </TabsContent>
          <TabsContent value="peers" className="text-sm text-muted-foreground pt-2">
            3 peers reachable.
          </TabsContent>
          <TabsContent value="history" className="text-sm text-muted-foreground pt-2">
            14 snapshots kept.
          </TabsContent>
        </Tabs>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what">
            <AccordionTrigger>What is a sealed release</AccordionTrigger>
            <AccordionContent>
              One signed object whose address is derived from its bytes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="verify">
            <AccordionTrigger>How verification works</AccordionTrigger>
            <AccordionContent>
              Every device recomputes the address and refuses a mismatch.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              Advanced options <ChevronsUpDown data-icon="inline-end" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="text-sm text-muted-foreground pt-2">
            Replication factor, cache ceiling, and beacon interval.
          </CollapsibleContent>
        </Collapsible>
      </Cell>
      <Cell title="Sidebar">
        <div className="rounded-lg border overflow-hidden">
          <SidebarProvider className="min-h-0">
            <Sidebar collapsible="none" className="h-64 w-full">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Apps</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive><Files /> Files</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><MessageSquare /> Messenger</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><Music /> Music</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton><Tv /> Holo TV</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
      </Cell>
    </Section>
  );
}
