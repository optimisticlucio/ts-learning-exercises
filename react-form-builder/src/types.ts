export type FormElement = TextInput | SubmitButton | ChoiceOption | Title | Paragraph | HorizontalLine | NumberInput;

export type TextInput = {
    type: 'text';
    title: string;
    variant: 'short' | 'area';
    defaultValue?: string;
    id: string;
};

export type SubmitButton = {
    type: 'submit';
    label: string;
}

export type ChoiceOption = {
    type: 'choice';
    title: string;
    variant: 'radio' | 'multi';
    options: Array<string>;
}

export type Title = {
    type: 'title';
    content: string;
}

export type Paragraph = {
    type: 'paragraph';
    content: string;
}

export type HorizontalLine = {
    type: 'horizontalLine';
}

export type NumberInput = {
    type: 'number';
    title: string;
    id: string;
    variant: 'text' | 'range';
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
}