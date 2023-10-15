import { StackPropsBase } from 'tamagui';

type StackProps = Omit<StackPropsBase, 'display'>;

type GridProps = {
  templateColumns?: string;
  gap?: string;
  gridArea?: string;
  gridAutoColumns?: string;
  gridAutoFlow?: string;
  gridAutoRows?: string;
  gridColumn?: string;
  gridColumnEnd?: string;
  gridColumnGap?: string;
  gridColumnStart?: string;
  gridGap?: string;
  gridRow?: string;
  gridRowEnd?: string;
  gridRowGap?: string;
  gridRowStart?: string;
  gridTemplate?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
};

export type GridComponentProps = StackProps & GridProps;
