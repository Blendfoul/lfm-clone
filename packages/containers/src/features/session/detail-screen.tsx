import { Grid, ScrollView, useMedia } from '@lfm-clone/ui';

import { useMemo } from 'react';
import { RaceEntries, RaceInformation, RegisterDialog } from '../../containers';
import { useApplicationState } from '../../provider';

export function SessionDetailScreen() {
  const media = useMedia();
  const { state } = useApplicationState();

  const templateColumns = useMemo(() => {
    return media.gtMd ? 'auto 1fr' : '1fr';
  }, [media]);

  return (
    <ScrollView>
      <Grid gridTemplateColumns={templateColumns} gap="$2">
        <RaceInformation />
        <RaceEntries />
      </Grid>
      <RegisterDialog isOpen={state.registerDialogOpen} />
    </ScrollView>
  );
}
