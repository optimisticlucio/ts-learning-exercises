import type {TextInput} from "../types.ts";
import { useFormContext } from "react-hook-form";

export default function TextInput({
    settings
                                  }: {
    settings: TextInput;
}) {
    const { register } = useFormContext();

    return <>
        <label id={settings.id}>
            {settings.title}
        </label>
        <br />
        {() => {
            // There's a lot of repetition between these two cases, but other methods I use felt unreadable or
            // likely to become a nightmare if more variants are added.
            switch (settings.variant) {
                case "short":
                    return (<input type="text" id={settings.id} {...register(settings.id, {value: settings.defaultValue})} />);
                case "area":
                    return (<textarea id={settings.id} {...register(settings.id, {value: settings.defaultValue})} />);
            }
        }}
    </>;
}