
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
  -   variant, a string which expects one of several options for decorative purposes:
      - "short", the default, representing the standard text input form.
      - "long" / "area", representing the textarea input form which allows for longer text input.
  -   title, a string which is shown on the left of the text input.
  -   id, a string which'll be the id for the sent data of this section.
  -   default-value, a string which'll be the default value of the text when the page is loaded. Default is empty.
- "submit": representing the submit form button. Only one of these can be in the form.
Customization options are:
  -   label, a string which'll be shown on the button itself.
  -   target, a string representing the URL which the form data is sent to.
- "choice": representing radio/multiple-choice buttons.
Customization options are:
  -   variant, a string which expects one of several options for decorative purposes:
      - "radio", the default option, representing a single-choice list.
      - "multi", representing a multi-choice list.
  -   title, a string which is shown above the options. Default is "Select Option".
  -   options, an array of strings which represents the options presented to the user.
  -   id, a string which'll be the id for the sent data of this section.
-   "title": representing a large text item that cannot be modified.
Customization options are:
      -   content, a string which represents the item's text.
-   "paragraph": representing a block of normally-formatted text between the form items.
Customization options are:
      -   content, a string which represents the item's text.
-   "horizontal-line": representing a horizontal line across the form.
No customization options.
-   "number": representing an input that only accepts numerical options.
Customization options are:
    -   variant, a string which expects one of several options for decorative purposes:
          - "text", the default, representing an input form where the user can write the number.
          - "range", representing the range element which accepts inputs visually.
    -   title, a string which is shown on the left of the text input.
    -   min, a number representing the minimal value the user can input. Default is 0.
    -   max, a number representing the maximal value the user can input. Default is 10.
    -   step, a number representing how far away the "options" for inputs are. Default is 1.
    (For example, "step: 2" only allows odd or even numbers, depending on the value of min.)
    -   default-value, a number representing the initial value presented to users.
