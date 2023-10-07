import { ImageProps } from "tamagui";
import { default as NextImage } from "next/image";

export const Image: React.FC<ImageProps> = ({ source, width, height, alt, ...props }) => {
  return (
    <NextImage
      src={(source as { uri: string }).uri}
      width={width as number}
      height={height as number}
      alt={alt as string}
      style={props as React.CSSProperties}
    />
  );
};
