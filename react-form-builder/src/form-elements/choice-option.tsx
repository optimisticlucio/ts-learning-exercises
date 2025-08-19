import type { ChoiceOption } from "../types.ts";
import { useFormContext } from "react-hook-form";

export default function ChoiceOption({ settings }: { settings: ChoiceOption }) {
  const { register } = useFormContext();

  return (
    <>
      <fieldset>
        <legend>{settings.title}</legend>
        {settings.options.map((option, index) => (
          <>
            <label key={option}>
              <input
                type={settings.variant}
                id={option}
                {...register(settings.title)}
              />
              {option}
            </label>
            {index < settings.options.length - 1 && <br />}
          </>
        ))}
      </fieldset>
      <br />
    </>
  );
}
