import { useMemo } from 'react';

import { Grid, ScrollView, useMedia } from '@lfm-clone/ui';

import { RaceEntries, RaceInformation } from '../../containers';

export function SessionDetailScreen() {
  const media = useMedia();

  const templateColumns = useMemo(() => {
    return media.gtMd ? 'auto 1fr' : '1fr';
  }, [media]);

  return (
    <ScrollView>
      <Grid gridTemplateColumns={templateColumns} gap="$2">
        <RaceInformation />
        <RaceEntries />
      </Grid>
    </ScrollView>
  );
}
