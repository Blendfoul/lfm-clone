import { GridComponentProps } from '../../atoms/grid/props';

export type TableItemProps = {
  trackPosition: number;
  name: {
    name: string;
    shortName: string;
  };
  origin: string;
  team: string;
  avatar: string;
} & GridComponentProps;
