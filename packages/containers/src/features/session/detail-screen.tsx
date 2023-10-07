import { Grid, useMedia } from '@lfm-clone/ui';

import { useMemo } from 'react';
import { RaceEntries, RaceInformation } from '../../containers';

export function SessionDetailScreen() {
  const media = useMedia();

  const templateColumns = useMemo(() => {
    return media.gtMd ? 'auto 1fr' : '1fr';
  }, [media]);

  return (
    <Grid gridTemplateColumns={templateColumns} gap="$2">
      <RaceInformation />
      <RaceEntries />
    </Grid>
  );
}
