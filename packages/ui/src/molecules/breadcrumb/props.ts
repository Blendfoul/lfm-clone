import type { ReactNode } from 'react';
import { StackProps } from 'tamagui';

export type BreadcrumbProps = {
  levels: { href: string; label: string }[];
  separator?: ReactNode;
  onBackClick?: () => void;
  backButton?: ReactNode;
  rightElement?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  lastLevelInteractive?: boolean;
} & StackProps;
