import { YStack, Grid, Adapt } from '@lfm-clone/ui';
import { SeasonSelector, SessionGrid, UserData } from '../../containers';

export function HomeScreen() {
  return (
    <YStack py="$4" px="$2" flex={1} space>
        <Grid gridTemplateColumns="1fr auto" gap="$3">
          <SeasonSelector />
          <Adapt when="gtSm">
            <UserData />
          </Adapt>
        </Grid>
        <SessionGrid />
    </YStack>
  )
}
