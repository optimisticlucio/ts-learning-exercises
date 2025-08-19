import type { TextInput } from "../types.ts";
import { useFormContext } from "react-hook-form";

export default function TextInput({ settings }: { settings: TextInput }) {
  const { register } = useFormContext();

  return (
    <>
      <label id={settings.id}>{settings.title}</label>
      <br />
      {settings.variant === "short" ? (
        <textarea
          id={settings.id}
          {...register(settings.id, { value: settings.defaultValue })}
        />
      ) : (
        <input
          type="text"
          id={settings.id}
          {...register(settings.id, { value: settings.defaultValue })}
        />
      )}
      <br />
    </>
  );
}
