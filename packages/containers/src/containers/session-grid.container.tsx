import React, { useMemo } from "react";

import useSWR from "swr";
import { Session, SessionContainer } from "../types";
import { ScrollView, Grid, useMedia } from "@lfm-clone/ui";
import { SessionCard } from "./session-card.container";
import { useApplicationState } from "../provider";
import { Platform, RefreshControl } from "react-native";

const CURRENT_SERIES = 142;

export const SessionGrid: React.FC = () => {
  const media = useMedia();
  const { state } = useApplicationState();
  const { data, isValidating, error, mutate } = useSWR<SessionContainer>(`v2/seasons/getUpcomingSessions/${state.selectedSeries ?? CURRENT_SERIES}`, {
    revalidateOnFocus: true,
  });

  const sessions = useMemo(() => {
    if (!data) {
      return [] as Session[];
    }

    const { data: sessionData } = data;

    return sessionData;
  }, [data]);

  const templateColumns = useMemo(() => {
    if (media.gtMd) {
      return 'repeat(3, 1fr)';
    }

    if (media.gtSm) {
      return 'repeat(2, 1fr)';
    }

    return '1fr';
  }, [media]);

  if (error || !data) {
    return null;
  }

  if (Platform.OS === 'web') {
    return (
      <Grid gridTemplateColumns={templateColumns} gap="$3">
        {
          sessions.map((session) => (
            <SessionCard key={session.race_id} {...session} />
          ))
        }
      </Grid>
    );
  }

  return (
    <ScrollView space refreshControl={<RefreshControl onRefresh={mutate} refreshing={isValidating} />}>
      {
        sessions.map((session) => (
          <SessionCard key={session.race_id} {...session} />
        ))
      }
    </ScrollView>
  );
};


  