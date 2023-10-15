import { SelectProps } from 'tamagui';

type Option = {
  label: string;
  value: string | number;
};

export type SelectMoleculeProps = {
  options: Option[];
  placeholder?: string;
} & SelectProps;
