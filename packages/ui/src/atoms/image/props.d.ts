import type { ImageProps } from 'next/image';
import type { ImageProps as TamaguiImageProps } from 'tamagui';

export type ImageComponentProps = Omit<TamaguiImageProps, '$platform-web'> & {
  '$platform-web'?: ImageProps;
};
