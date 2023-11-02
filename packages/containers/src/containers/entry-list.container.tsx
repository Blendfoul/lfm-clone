import React from 'react';

import { TableItem, Separator, SizableText, Tabs, License, ScrollView } from '@lfm-clone/ui';
import { useParams } from 'solito/navigation';

import { useEntriesState } from '../hooks/use-entries-state';

type Params = { id: string };

export const EntryListContainer: React.FC = () => {
  const { id } = useParams<Params>();
  const { availableSplits, driversInSplits } = useEntriesState(id);

  return (
    <Tabs defaultValue="0" width="100%" orientation="horizontal" flexDirection="column">
      <ScrollView horizontal>
        <Tabs.List $platform-native={{ justifyContent: 'center' }} paddingVertical="$2">
          {availableSplits.map((split, index) => (
            <Tabs.Tab key={split.name} value={index.toString()}>
              <SizableText fontFamily="$body">{split.name}</SizableText>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </ScrollView>
      <Separator paddingVertical="$1.5" />
      {driversInSplits.map((drivers, index) => (
        <ScrollView horizontal>
          <Tabs.Content key={drivers[0].user_id} value={index.toString()}>
            {drivers.map((driver) => (
              <TableItem
                userId={driver.user_id}
                key={driver.steam_id}
                ai="center"
                gridTemplateColumns="0.2fr auto 1fr 1fr 1fr 1fr"
                gap="$2"
                flexDirection="row"
                py="$1"
                origin={driver.origin.toLowerCase()}
                name={{
                  name: `${driver.vorname} ${driver.nachname}`,
                  shortName: driver.shortname,
                }}
                team={driver.team_name}
                trackPosition={driver.raceNumber}
                avatar={driver.avatar}
              >
                <SizableText fontFamily="$body">{driver.elo}</SizableText>
                <License
                  license={driver.license}
                  safetyRating={driver.safety_rating}
                  safetyRatingDivision="C"
                />
              </TableItem>
            ))}
          </Tabs.Content>
        </ScrollView>
      ))}
    </Tabs>
  );
};
