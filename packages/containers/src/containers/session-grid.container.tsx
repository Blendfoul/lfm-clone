import React, { useMemo } from 'react';

import { ScrollView, Grid, useMedia } from '@lfm-clone/ui';
import { RefreshControl } from 'react-native';
import useSWR from 'swr';

import { SessionCard } from './session-card.container';
import { useApplicationState } from '../provider';
import { Session, SessionContainer } from '../types';

const CURRENT_SERIES = 142;

export const SessionGrid: React.FC = () => {
  const media = useMedia();
  const { state } = useApplicationState();

  const { data, isValidating, error, mutate } = useSWR<SessionContainer>(
    `v2/seasons/getUpcomingSessions/${state.selectedSeries ?? CURRENT_SERIES}`,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
    }
  );

  const sessions = useMemo(() => {
    if (!data) {
      return [] as Session[];
    }

    const { data: sessionData } = data;

    return sessionData;
  }, [data]);

  const templateColumns = useMemo(() => {
    if (media.gtLg) {
      return 'repeat(4, auto)';
    }

    if (media.gtMd) {
      return 'repeat(3, auto)';
    }

    if (media.gtSm) {
      return 'repeat(2, auto)';
    }

    return 'auto';
  }, [media]);

  if (error || !data) {
    return null;
  }

  return (
    <ScrollView
      space
      refreshControl={<RefreshControl onRefresh={mutate} refreshing={isValidating} />}
    >
      <Grid gridTemplateColumns={templateColumns} gap="$3">
        {sessions.map((session) => (
          <SessionCard key={session.race_id} {...session} />
        ))}
      </Grid>
    </ScrollView>
  );
};
