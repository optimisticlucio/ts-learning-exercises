import "./App.css";
import type { FormElement } from "./types.ts";
import TextInput from "./form-elements/text-input.tsx";
import { useForm, FormProvider } from "react-hook-form";
import NumberInput from "./form-elements/number-input.tsx";
import ChoiceOption from "./form-elements/choice-option.tsx";

function FormBuilder({ formElements }: { formElements: Array<FormElement> }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        {formElements.map((formElement) => {
          switch (formElement.type) {
            case "horizontalLine":
              return <hr />;

            case "title":
              return <h3>{formElement.content}</h3>;

            case "paragraph":
              return <p>{formElement.content}</p>;

            case "text":
              return <TextInput settings={formElement} />;

            case "submit":
              return <input type="submit" value={formElement.label} />;

            case "number":
              return <NumberInput settings={formElement} />;

            case "choice":
              return <ChoiceOption settings={formElement} />;
          }
        })}
      </form>
    </FormProvider>
  );
}

export default FormBuilder;
