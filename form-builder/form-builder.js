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
    // TODO
}

function formChoiceOption(item) {
    // TODO
}

function formTitle(item) {
    // TODO
}

function formParagraph(item) {
    // TODO
}

function formNumberInput(item) {
    // TODO
}