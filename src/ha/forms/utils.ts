export type HaFormSchema = HaFormStringSchema | HaFormBooleanSchema | HaFormSelector;

export interface HaFormStringSchema extends HaFormBaseSchema {
  type: 'string';
  format?: string;
}

export interface HaFormBooleanSchema extends HaFormBaseSchema {
  type: 'boolean';
}

export interface HaFormSelector extends HaFormBaseSchema {
  type?: never;
  selector: Selector;
}

export interface HaFormBaseSchema {
  name: string;
  // This value is applied if no data is submitted for this field
  default?: HaFormData;
  required?: boolean;
  description?: {
    suffix?: string;
    // This value will be set initially when form is loaded
    suggested_value?: HaFormData;
  };
}

export type HaFormData = HaFormStringData | HaFormBooleanData;

export type HaFormStringData = string;
export type HaFormBooleanData = boolean;

export type Selector = StringSelector | BooleanSelector;

export interface StringSelector {
  text: {
    multiline?: boolean;
    type?:
      | 'number'
      | 'text'
      | 'search'
      | 'tel'
      | 'url'
      | 'email'
      | 'password'
      | 'date'
      | 'month'
      | 'week'
      | 'time'
      | 'datetime-local'
      | 'color';
    suffix?: string;
  };
}

export interface BooleanSelector {
  // eslint-disable-next-line @typescript-eslint/ban-types
  boolean: {};
}
