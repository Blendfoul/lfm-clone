import { useMemo } from 'react';

import useSWR from 'swr';

import { Race } from '../types';

type SplitInfo = {
  sof: number;
  name: string;
};

export const useEntriesState = (raceId: string) => {
  const { data, error } = useSWR<Race>(`race/${raceId}`);

  const availableSplits = useMemo(() => {
    if (!data || error) {
      return [];
    }

    const nSplits = data.splits.splits;
    const splitData: SplitInfo[] = [];

    for (let i = 0; i < nSplits; i++) {
      splitData.push({
        sof: data[i === 0 ? 'sof' : `split${i + 1}_sof`] as number,
        name: `Split ${i + 1} - ${data[i === 0 ? 'sof' : `split${i + 1}_sof`]}`,
      });
    }

    return splitData;
  }, []);

  const driversInSplits = useMemo(() => {
    if (!data || error) {
      return [];
    }

    return data.splits?.participants?.map((split) => split.entries) ?? [];
  }, []);

  return {
    driversInSplits,
    availableSplits,
  };
};
