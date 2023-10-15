import { Stack } from "tamagui";
import { GridComponentProps } from "./props";

export const Grid: React.FC<GridComponentProps> = ({children, ...props}) => {
  return (
    <Stack
      flexDirection="column"
      {...props}
      $platform-web={{
        display: 'grid' as 'flex',
        ...props,
      }}
      >
        {children}
    </Stack>
  );
}
