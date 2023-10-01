import { H1, YStack } from '@lfm-clone/ui';
import { SeasonSelector, SessionGrid } from '../../containers';

export function HomeScreen() {
  return (
    <YStack py="$4" px="$2" flex={1} space>
        <SeasonSelector />
        <SessionGrid />
    </YStack>
  )
}
