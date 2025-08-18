import './App.css'
import type { FormElement } from "./types.ts";
import TextInput from "./form-elements/text-input.tsx";
import { useForm, FormProvider } from "react-hook-form";

function FormBuilder({
    formElements
                     } : {
  formElements: Array<FormElement>
}) {
  const methods = useForm();

  return (
      <FormProvider {...methods}>
        <form>
          {formElements.map(formElement => {
            switch(formElement.type) {
              case "horizontalLine":
                return (<br />);

              case "title":
                return (<h3>{formElement.content}</h3>);

              case "paragraph":
                return (<p>{formElement.content}</p>);

              case "text":
                return <TextInput settings={formElement} />

              case "submit":
                return <input type="submit" value={formElement.label} />

              default:
                // TODO: Delete this case once I finish coding the rest.
                console.warn(`Forgot to handle formElement type ${formElement.type}`);
                return (<></>);
            }
            })}
        </form>
      </FormProvider>
  )
}

export default FormBuilder
