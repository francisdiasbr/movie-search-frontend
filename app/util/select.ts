export interface SelectOption {
  label: string;
  value: string;
}

export const toSelectOptions = (values: Array<number | string>): SelectOption[] =>
  values.map(value => ({ label: String(value), value: String(value) }));
