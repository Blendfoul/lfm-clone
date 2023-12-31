import React, { useCallback, useMemo } from 'react';

import useSWR from "swr";
import { Select } from "@lfm-clone/ui";

import type { Season } from "../types";
import { useApplicationState } from '../provider';

const ACC_KEY = 0;

export const SeasonSelector: React.FC = () => {
  const {state, setState} = useApplicationState();
  const {data, error} = useSWR<Season>('seasons/getMinifiedSeasonBySim', {
    revalidateOnFocus: false,
  });

  const minifiedSeries = useMemo(() => {
    if (!data) {
      return [];
    }

    const { series } = data;

    return series[ACC_KEY].series.map((series, index) => {
      if(index === 0 && !state.selectedSeries) {
        setState({
          ...state,
          selectedSeries: series.event_id,
        });
      }

      return ({
        label: series.series_name,
        value: series.event_id,
      });
    });
  }, [data]);

  const onSelect = useCallback((value: string) => {
    setState({
        ...state,
        selectedSeries: parseInt(value, 10),
      });
  }, [setState, state]);

  if (error || !data) {
    return null;
  }

  return (
    <Select
      placeholder={data.season_name}
      value={state.selectedSeries?.toString()} 
      onValueChange={onSelect}
      options={minifiedSeries}  
    />
  );
};
