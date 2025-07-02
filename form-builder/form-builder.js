/*
The form is built as a collection of dictionaries and arrays. Each dictionary represents a specific item, and
the array represents the order in which these items are placed on the page.

The definition should be one large array, meaning it starts and ends with []s.

Each item should have a "type" property, defining what kind of form item it is, and then optionally
other properties describing type-specific customization options.

Every item has the following customization options:
    - required, a boolean which, if true, requires the user fill in this section before sending. Default is false.

The available item types, and their contents, are:
    - "text": representing a short text input.
        Customization options are:
        -   title, a string which is shown on the left of the text input. Default is "Text Input".
        -   id, a string which'll be the id for the sent data of this section.
        -   long, a boolean value which, if true, turns this into a long-form text input. Default is false.
        -   default, a string which'll be the default value of the text when the page is loaded. Default is empty.
    - "send": representing the send form button. Only one of these can be in the form.
        Customization options are:
        -   content, a string which'll be shown on the button itself.
        -   target, a string representing the URL which the form data is sent to.
    - "choice": representing radio/multiple-choice buttons.
        Customization options are:
        -   multi-choice, a boolean which, if true, turns the contents from radio-buttons to multi-choice buttons.
            Default is false.
        -   options, an array of strings which represents the options presented to the user.
        -   id, a string which'll be the id for the sent data of this section.
        -   default, a string which represents a single option that's pre-selected on page load. Default is empty.
    -   "title": representing a large text item that cannot be modified.
        Customization options are:
        -   content, a string which represents the item's text.
    -   "paragraph": representing a block of normally-formatted text between the form items.
        Customization options are:
        -   content, a string which represents the item's text.
    -   "horizontal-line: representing a horizontal line across the form.
        No customization options.
    -   "number": representing an input that only accepts numerical options.
        Customization options are:
        -   bar, a bool that, if set to true, allows inputs as a range bar. Default is false.
        -   min, a number representing the minimal value the user can input. Default is 0.
        -   max, a number representing the maximal value the user can input. Default is 10.
        -   step, a number representing how far away the "options" for inputs are. Default is 1.
        (For example, "step: 2" only allows odd or even numbers, depending on the value of min.)
        -   default, a number representing the initial value presented to users.
 */