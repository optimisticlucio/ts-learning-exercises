function buildForm(formArray){
    const form = document.createElement('form');

    const formContents = formArray.flatMap(handleFormContents);
    form.append(...formContents);

    return form;
}

function handleFormContents(item) {
    let formItem; // This is what's going to be returned at the end of the function.

    if (!item.type ||  typeof (item.type) !== 'string') {
        throw new Error(`Invalid form item type: "${item.type}" is not a string!`);
    }

    switch (item.type) {
        case "text":
            formItem = formTextInput(item);
            break;
        case "submit":
            formItem = formSubmitButton(item);
            break;
        case "choice":
            formItem = formChoiceOption(item);
            break;
        case "title":
            formItem = formTitle(item);
            break;
        case "paragraph":
            formItem = formParagraph(item);
            break;
        case "horizontal-line":
            formItem = document.createElement("hr");
            break;
        case "number":
            formItem = formNumberInput(item);
            break;
        default:
            throw new Error(`Invalid form item type: ${item.type} is not a recognized item type!`);
    }

    formItem = Array.isArray(formItem) ? formItem : [formItem];
    formItem.append(document.createElement("br"));

    return formItem.slice(0, -1);
}

function formTextInput(item) {
    let arrayOfItems = [];

    if (item.text) {
        let label = document.createElement("label");
        label.innerText = item.text;

        if (item.id) {
            label.setAttribute("for", item.id);
        }

        arrayOfItems.push(label);
        arrayOfItems.push(document.createElement("br"));
    }

    let textInput;

    switch (item.variant) {
        case undefined:
        case null:
        case "short":
            textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            break;

        case "long":
        case "area":
            textInput = document.createElement("textarea");
            break;

        default:
            throw new Error(`Text Input received an invalid variant type: ${item.variant}`);
    }

    if (item.default) {
        textInput.value = item.default;
    }

    if (item.id) {
        textInput.setAttribute("id", item.id);
        textInput.setAttribute("name", item.id);
    }

    arrayOfItems.push(textInput);

    return arrayOfItems;
}

function formSubmitButton(item) {
    assureFieldExistsAndIsString(item.label, 'Title', 'label');

    let submitTarget = item.target;
    if (typeof submitTarget !== 'string') {
       submitTarget = null;
    }

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', submitTarget.label);

    if (submitTarget) {
        submitButton.setAttribute('formtarget', submitTarget);
    }

    return submitButton;
}

function formChoiceOption(item) {
    let fieldset = document.createElement("fieldset");

    let legend = document.createElement("legend");
    legend.innerText = item.title || "Select Option";
    fieldset.append(legend);

    let itemType;

    switch (item.variant) {
        case undefined:
        case null:
        case "radio":
            itemType = "radio";
            break;

        case "multi":
            itemType = "checkbox";
            break;

        default:
            throw new Error(`Choice Option received an invalid variant type: ${item.variant}`);
    }

    let options = item.options.flatMap((option) => {
        let optionArray = [];

        let optionInput = document.createElement("input");
        optionInput.setAttribute("type", itemType);

        let optionLabel = document.createElement("label");

        let optionId = option.replaceAll(" ", "-").toLowerCase();
        optionInput.setAttribute("id", optionId);
        optionInput.setAttribute("name", optionId);
        optionLabel.setAttribute("for", optionId);

        optionArray.push(optionInput, optionLabel,
            document.createElement("br"));

        return optionArray;
    }).slice(0, -1);

    fieldset.append(...options);

    return fieldset;
}

function formTitle(item) {
    assureFieldExistsAndIsString(item.content, 'Title', 'content');

    let title = document.createElement("h3");
    title.innerText = item.content;

    return title;
}

function formParagraph(item) {
    assureFieldExistsAndIsString(item.content, 'Paragraph', 'content');

    let paragraph = document.createElement("p");
    paragraph.innerText = item.content;

    return paragraph;
}

function formNumberInput(item) {
    let arrayOfItems = [];

    if (item.text) {
        let label = document.createElement("label");
        label.innerText = item.text;

        if (item.id) {
            label.setAttribute("for", item.id);
        }

        arrayOfItems.push(label);
        arrayOfItems.push(document.createElement("br"));
    }

    let numberInput;

    switch (item.variant) {
        case undefined:
        case null:
        case "text":
            numberInput = document.createElement("input");
            numberInput.setAttribute("type", "number");
            break;

        case "range":
            numberInput = document.createElement("input");
            numberInput.setAttribute("type", "range");
            break;

        default:
            throw new Error(`Number Input received an invalid variant type: ${item.variant}`);
    }

    if (item.default) {
        numberInput.value = item.default;
    }

    numberInput.setAttribute("min", item.min || 0);
    numberInput.setAttribute("max", item.max || 10);
    numberInput.setAttribute("step", item.step || 1);

    arrayOfItems.append(numberInput);

    return arrayOfItems;
}

function assureFieldExistsAndIsString(variable, nameOfFormItem, nameOfField) {
    if (!variable) {
        throw new Error(`${nameOfFormItem}'s ${nameOfField} field is missing!`);
    }

    if (typeof (variable) !== 'string') {
        throw new Error(`${nameOfFormItem}'s ${nameOfField} field is not a string!`);
    }
}