import './App.css'
import type { FormElement } from "./types.ts";
import TextInput from "./form-elements/text-input.tsx";

function FormBuilder({
    formElements
                     } : {
  formElements: Array<FormElement>
}) {
  return (
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

          default:
            // TODO: Delete this case once I finish coding the rest.
            console.warn(`Forgot to handle formElement type ${formElement.type}`);
            return (<></>);
        }
        })}
    </form>
  )
}

export default FormBuilder
