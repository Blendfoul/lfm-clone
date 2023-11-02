import { Platform } from 'react-native';
import { Stack } from 'tamagui';

import { GridComponentProps } from './props';

export const Grid: React.FC<GridComponentProps> = ({ children, ...props }) => {
  return (
    <Stack
      display={Platform.OS === 'web' ? ('grid' as 'flex') : 'flex'}
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
};
