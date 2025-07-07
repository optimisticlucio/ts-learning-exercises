function buildForm (formArray){
    const form = document.createElement('form');

    const formContents = formArray.map(handleFormContents);
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

    return formItem;
}

function formTextInput(item) {
    // TODO
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
    // TODO
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
    // TODO
}

function assureFieldExistsAndIsString(variable, nameOfFormItem, nameOfField) {
    if (!variable) {
        throw new Error(`${nameOfFormItem}'s ${nameOfField} field is missing!`);
    }

    if (typeof (variable) !== 'string') {
        throw new Error(`${nameOfFormItem}'s ${nameOfField} field is not a string!`);
    }
}