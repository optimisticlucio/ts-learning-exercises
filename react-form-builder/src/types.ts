export type FormElement = TextInput | SubmitButton | ChoiceOption | Title | Paragraph | HorizontalLine | NumberInput;

type TextInput = {
    type: 'text';
    title: string;
    variant: 'short' | 'area';
    defaultValue?: string;
    id?: string;
};

type SubmitButton = {
    type: 'submit';
    label: string;
    submitTarget?: string;
}

type ChoiceOption = {
    type: 'choice';
    title: string;
    variant: 'radio' | 'multi';
    options: Array<string>;
}

type Title = {
    type: 'title';
    content: string;
}

type Paragraph = {
    type: 'paragraph';
    content: string;
}

type HorizontalLine = {
    type: 'horizontalLine';
}

type NumberInput = {
    type: 'number';
    title: string;
    id?: string;
    variant: 'text' | 'range';
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
}