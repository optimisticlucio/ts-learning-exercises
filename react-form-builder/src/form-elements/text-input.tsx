import type {TextInput} from "../types.ts";

export default function TextInput({
    settings
                                  }: {
    settings: TextInput;
}) {
    return <>
        <label id={settings.id}>
            {settings.title}
        </label>
        <br />
        {() => {
            // There's a lot of overlap here. I could have done {variant == "short" ? input type=text : textarea},
            // but that seems less readable and more prone to becoming a mess if more variants need to be added.
            switch (settings.variant) {
                case "short":
                    return (<input type="text" name={settings.id} id={settings.id} value={settings.defaultValue}/>);
                case "area":
                    return (<textarea name={settings.id} id={settings.id} value={settings.defaultValue} />);
            }
        }}
    </>;
}