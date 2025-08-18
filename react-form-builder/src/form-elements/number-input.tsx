import type {NumberInput} from "../types.ts";
import { useFormContext } from "react-hook-form";

export default function NumberInput ({
    settings
                                     } : {
    settings: NumberInput;
}) {
    const { register } = useFormContext();

    return (<>
            { settings.title &&
                <>
                    <label>
                        { settings.title }
                    </label>
                    <br />
                </>
            }
            <input type={settings.variant}
                   {...register(settings.id, {value: settings.defaultValue, min: settings.min, max: settings.max})}
                   min={settings.min}
                   max={settings.max}
                   step={settings.step}
            />
    </>
    );
}