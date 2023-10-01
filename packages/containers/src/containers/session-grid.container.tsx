import React, { useMemo } from "react";

import useSWR from "swr";
import { Session, SessionContainer } from "../types";
import { ScrollView, Spinner, XStack } from "@lfm-clone/ui";
import { SessionCard } from "./session-card.container";
import { useApplicationState } from "../provider";
import { RefreshControl } from "react-native";

const CURRENT_SERIES = 142;

export const SessionGrid: React.FC = () => {
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

  if (error || !data) {
    return null;
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


  