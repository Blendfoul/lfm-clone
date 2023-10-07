import React from 'react';

import { Stack } from 'tamagui';
import { ComponentPropsWithoutRef } from 'react';

type StackProps = Omit<ComponentPropsWithoutRef<typeof Stack>, 'display'>;

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

type GridComponentProps = StackProps & GridProps;

export const Grid: React.FC<GridComponentProps> = ({children, ...props}) => {
  return (
    <Stack 
      display={'grid' as 'flex'}
      $platform-web={{
        display: 'grid' as 'flex',
        ...props,
      }}
      >
        {children}
    </Stack>
  );
};
