import { default as NextImage, ImageProps } from "next/image";

import type { ImageComponentProps } from './props';

export const Image: React.FC<ImageComponentProps> = (props) => {
  return (<NextImage {...props['$platform-web'] as ImageProps} />);
};
