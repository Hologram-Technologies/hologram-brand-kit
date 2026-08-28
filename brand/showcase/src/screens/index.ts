import type { ComponentType } from "react";
import { EnterCode } from "./device-pairing/enter-code";
import { Verifying } from "./device-pairing/verifying";
import { Paired } from "./device-pairing/paired";

// Every product wireframe registers here. The completeness gate cross checks
// this registry against brand/product specs.
export type Screen = {
  feature: string;
  screen: string;
  title: string;
  component: ComponentType;
};

export const SCREENS: Screen[] = [
  { feature: "device-pairing", screen: "enter-code", title: "Enter pairing code", component: EnterCode },
  { feature: "device-pairing", screen: "verifying", title: "Verifying devices", component: Verifying },
  { feature: "device-pairing", screen: "paired", title: "Device paired", component: Paired },
];
