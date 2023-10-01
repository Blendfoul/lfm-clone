import React, { useCallback, useMemo } from 'react';

import useSWR from "swr";
import { Adapt, Select, Spinner, XStack } from "@lfm-clone/ui";

import type { Season } from "../types";
import { useApplicationState } from '../provider';

const ACC_KEY = 0;

export const SeasonSelector: React.FC = () => {
  const {state, setState} = useApplicationState();
  const {data, isValidating, error} = useSWR<Season>('seasons/getMinifiedSeasonBySim', {
    revalidateOnFocus: false,
  });

  const minifiedSeries = useMemo(() => {
    if (!data) {
      return [];
    }

    const { series } = data;

    return series[ACC_KEY].series.map((series) => ({
      label: series.series_name,
      value: series.event_id,
    }));
  }, [data]);

  const onSelect = useCallback((value: string) => {
    setState({
      ...state,
      selectedSeries: parseInt(value, 10),
    });
  }, [state, setState]);

  if (isValidating) {
    return (
      <XStack justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </XStack>
    );
  }

  if (error || !data) {
    return null;
  }


  return (
    <Select defaultValue={state.selectedSeries?.toString()} onValueChange={onSelect}>
      <Select.Trigger>
        <Select.Value placeholder={data?.season_name} />
      </Select.Trigger>

      <Adapt platform="touch">
      <Select.Sheet>
        <Select.Sheet.Frame>
          <Select.Content>
          {minifiedSeries.map((series, index) => (
          <Select.Item key={series.value} index={index} value={series.value.toString()}>
            <Select.ItemText>{series.label}</Select.ItemText>  
          </Select.Item>
        ))
        }
          </Select.Content>
        </Select.Sheet.Frame>
        <Select.Sheet.Overlay />
      </Select.Sheet>
    </Adapt>


      <Select.Content>
      <Select.ScrollUpButton />
      <Select.Viewport>
        {minifiedSeries.map((series, index) => (
          <Select.Item key={series.value} index={index} value={series.value.toString()}>
            <Select.ItemText>{series.label}</Select.ItemText>  
          </Select.Item>
        ))
        }
      </Select.Viewport>
      <Select.ScrollDownButton />

      </Select.Content>
    </Select>
  );
};
