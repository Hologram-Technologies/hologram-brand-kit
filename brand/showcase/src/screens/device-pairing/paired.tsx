import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/registry/new-york-v4/ui/table";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/registry/new-york-v4/ui/alert";
import { ShieldCheck } from "lucide-react";

const DEVICES = [
  ["desk-7f3a", "primary", "just now"],
  ["phone-c221", "paired", "just now"],
  ["vps-contabo", "paired", "2 days ago"],
];

export function Paired() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="font-display text-xl">Device paired</CardTitle>
          <CardDescription>phone-c221 now holds a verified copy of your space.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Alert>
            <ShieldCheck />
            <AlertTitle>Verified on both devices</AlertTitle>
            <AlertDescription>
              Both devices computed the same space address.
            </AlertDescription>
          </Alert>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEVICES.map(([name, role, when]) => (
                <TableRow key={name}>
                  <TableCell className="font-mono">{name}</TableCell>
                  <TableCell>
                    <Badge variant={role === "primary" ? "default" : "secondary"}>{role}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{when}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Done</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
