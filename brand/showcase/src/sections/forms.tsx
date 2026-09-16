import { useState } from "react";
import { useForm } from "react-hook-form";
import { Cell, Section } from "../App";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york-v4/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/registry/new-york-v4/ui/select";
import { NativeSelect, NativeSelectOption } from "@/registry/new-york-v4/ui/native-select";
import { Switch } from "@/registry/new-york-v4/ui/switch";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp";
import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from "@/registry/new-york-v4/ui/input-group";
import {
  Field, FieldDescription, FieldGroup, FieldLabel,
} from "@/registry/new-york-v4/ui/field";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/registry/new-york-v4/ui/form";
import {
  Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
  ComboboxTrigger, ComboboxValue,
} from "@/registry/new-york-v4/ui/combobox";
import { Calendar } from "@/registry/new-york-v4/ui/calendar";

const NODES = ["desk-7f3a", "phone-c221", "vps-contabo", "tablet-90ee"];

export function Forms() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 7, 26));
  const form = useForm({ defaultValues: { space: "" } });
  return (
    <Section id="forms" title="Forms">
      <Cell title="Text input">
        <Field>
          <FieldLabel htmlFor="space-name">Space name</FieldLabel>
          <Input id="space-name" placeholder="my-first-space" />
          <FieldDescription>Lower case, digits, and dots.</FieldDescription>
        </Field>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>holo://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="key/9f2ac41b" />
        </InputGroup>
        <Textarea placeholder="Describe what this space is for" rows={3} />
      </Cell>
      <Cell title="Choices">
        <FieldGroup>
          <div className="flex items-center gap-3">
            <Checkbox id="pin-device" defaultChecked />
            <Label htmlFor="pin-device">Pin to this device</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="offline" defaultChecked />
            <Label htmlFor="offline">Available offline</Label>
          </div>
          <RadioGroup defaultValue="verified">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="verified" id="r-verified" />
              <Label htmlFor="r-verified">Verified replication</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="fast" id="r-fast" />
              <Label htmlFor="r-fast">Fast replication</Label>
            </div>
          </RadioGroup>
          <Slider defaultValue={[60]} max={100} step={1} aria-label="Cache size" />
        </FieldGroup>
      </Cell>
      <Cell title="Selects">
        <Select defaultValue="frankfurt">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frankfurt">Frankfurt</SelectItem>
            <SelectItem value="virginia">Virginia</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
          </SelectContent>
        </Select>
        <NativeSelect className="w-full" defaultValue="14">
          <NativeSelectOption value="7">Keep snapshots 7 days</NativeSelectOption>
          <NativeSelectOption value="14">Keep snapshots 14 days</NativeSelectOption>
          <NativeSelectOption value="30">Keep snapshots 30 days</NativeSelectOption>
        </NativeSelect>
        <Combobox items={NODES}>
          <ComboboxTrigger className="w-full justify-between">
            <ComboboxValue placeholder="Attach a node" />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxEmpty>No node found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Cell>
      <Cell title="One time code">
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
        <p className="text-sm text-muted-foreground">Enter the pairing code shown on your other device.</p>
      </Cell>
      <Cell title="Validated form">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(() => {})}
          >
            <FormField
              control={form.control}
              name="space"
              rules={{ required: "A name is required." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New space</FormLabel>
                  <FormControl>
                    <Input placeholder="research-notes" {...field} />
                  </FormControl>
                  <FormDescription>Sealed and signed on creation.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit bg-brand text-brand-foreground hover:bg-brand/90">
              Create space
            </Button>
          </form>
        </Form>
      </Cell>
      <Cell title="Calendar">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border mx-auto" />
      </Cell>
    </Section>
  );
}
