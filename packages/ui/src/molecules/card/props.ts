import React from 'react';

import { CardProps } from 'tamagui';

export type CardMoleculeProps = {
  title: string;
  header: React.ReactNode;
  footer: React.ReactNode;
  href?: string;
} & CardProps;
