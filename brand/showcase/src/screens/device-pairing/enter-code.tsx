import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card";
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Badge } from "@/registry/new-york-v4/ui/badge";

export function EnterCode() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-xl">Pair this device</CardTitle>
            <Badge variant="secondary">phone-c221</Badge>
          </div>
          <CardDescription>
            Enter the six digit code shown on your other device.
            The code expires in ten minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Pair device</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
