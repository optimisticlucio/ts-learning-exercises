function buildForm(formArray){
    const form = document.createElement('form');

    const formContents = formArray.flatMap(handleFormContents);
    form.append(...formContents);

    return form;
}

function handleFormContents(item) {
    let newFormItems; // This is what's going to be returned at the end of the function.

    if (!item.type ||  typeof (item.type) !== 'string') {
        throw new Error(`Invalid form item type: "${item.type}" is not a string!`);
    }

    switch (item.type) {
        case "text":
            newFormItems = formTextInput(item);
            break;
        case "submit":
            newFormItems = formSubmitButton(item);
            break;
        case "choice":
            newFormItems = formChoiceOption(item);
            break;
        case "title":
            newFormItems = formTitle(item);
            break;
        case "paragraph":
            newFormItems = formParagraph(item);
            break;
        case "horizontal-line":
            newFormItems = document.createElement("hr");
            break;
        case "number":
            newFormItems = formNumberInput(item);
            break;
        default:
            throw new Error(`Invalid form item type: ${item.type} is not a recognized item type!`);
    }

    newFormItems = Array.isArray(newFormItems) ? newFormItems : [newFormItems];

    return newFormItems;
}

function formTextInput(item) {
    const arrayOfItems = [];

    if (item.title) {
        const label = document.createElement("label");
        label.innerText = item.title;

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

    if (item.defaultValue) {
        textInput.value = item.defaultValue;
    }

    if (item.id) {
        textInput.setAttribute("id", item.id);
        textInput.setAttribute("name", item.id);
    }

    arrayOfItems.push(textInput);
    arrayOfItems.push(document.createElement("br"));

    return arrayOfItems;
}

function formSubmitButton(item) {
    assureFieldExistsAndIsString({
        variable: item.label,
        nameOfFormItem: 'Submit Button',
        nameOfField: 'label'});

    const submitTarget = typeof submitTarget === 'string' ? item.target : null;

    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');

    if (item.label) {
        submitButton.setAttribute('value', item.label);
    }

    if (submitTarget) {
        submitButton.setAttribute('formtarget', submitTarget);
    }

    return [submitButton, document.createElement('br')];
}

function formChoiceOption(item) {
    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
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

    const options = item.options.flatMap((option) => {
        const optionArray = [];

        const optionInput = document.createElement("input");
        optionInput.setAttribute("type", itemType);

        const optionLabel = document.createElement("label");
        optionLabel.innerText = option;

        const optionId = option.replaceAll(" ", "-").toLowerCase();
        optionInput.setAttribute("id", optionId);
        optionInput.setAttribute("name", optionId);
        optionLabel.setAttribute("for", optionId);

        optionArray.push(optionInput, optionLabel,
            document.createElement("br"));

        return optionArray;
    }).slice(0, -1);

    fieldset.append(...options);

    return [fieldset, document.createElement('br')];
}

function formTitle(item) {
    assureFieldExistsAndIsString({
        variable: item.content,
        nameOfFormItem: 'Title',
        nameOfField: 'content'});

    const title = document.createElement("h3");
    title.innerText = item.content;

    return title;
}

function formParagraph(item) {
    assureFieldExistsAndIsString(item.content, 'Paragraph', 'content');

    const paragraph = document.createElement("p");
    paragraph.innerText = item.content;

    return paragraph;
}

function formNumberInput(item) {
    const arrayOfItems = [];

    if (item.title) {
        const label = document.createElement("label");
        label.innerText = item.title;

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

    if (item.defaultValue) {
        numberInput.value = item.defaultValue;
    }

    numberInput.setAttribute("min", item.min || 0);
    numberInput.setAttribute("max", item.max || 10);
    numberInput.setAttribute("step", item.step || 1);

    if (item.id){
        numberInput.setAttribute("id", item.id);
        numberInput.setAttribute("name", item.id);
    }

    arrayOfItems.push(numberInput);
    arrayOfItems.push(document.createElement("br"));

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