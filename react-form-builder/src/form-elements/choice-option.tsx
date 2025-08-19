import type { ChoiceOption } from "../types.ts";
import { useFormContext } from "react-hook-form";

export default function ChoiceOption({ settings }: { settings: ChoiceOption }) {
  const { register } = useFormContext();

  return <></>;
}
