import React from "react";

import { Grid, Image, Separator, SizableText, Tabs } from "@lfm-clone/ui";

import { useEntriesState } from "../hooks/use-entries-state";
import { useParams } from "solito/navigation";

type Params = { id: string };

export const EntryListContainer: React.FC = () => {
  const { id } = useParams<Params>();
  const { availableSplits, driversInSplits } = useEntriesState(id);

  return (
    <Tabs defaultValue="0" width="100%" orientation="horizontal" flexDirection="column">
      <Tabs.List>
        {
          availableSplits.map((split, index) => (
            <Tabs.Tab key={split.name} value={index.toString()}>
              <SizableText fontFamily="$body">{split.name}</SizableText>
            </Tabs.Tab>
          ))
        }
      </Tabs.List>
      <Separator paddingVertical="$1.5" />
      {
        driversInSplits.map((drivers, index) => (
          <Tabs.Content key={drivers[0].user_id} value={index.toString()}>
            {
              drivers.map((driver) => (
                <Grid key={driver.steam_id} ai="center" gridTemplateColumns="0.1fr auto 1fr 1fr 1fr 1fr" gap="$2" flexDirection="row" py="$1">
                  <SizableText fontFamily="$body" textAlign="center">#{driver.raceNumber}</SizableText>
                  <Image 
                    source={{ uri: driver.avatar }} 
                    alt={driver.vorname} 
                    width={50} 
                    height={50}
                    $platform-web={{
                      width: 50,
                      height: 50,
                      src: driver.avatar,
                      alt: driver.vorname,
                    }}
                  />
                  <SizableText fontFamily="$body">{driver.vorname} {driver.nachname}</SizableText>
                  <SizableText fontFamily="$body">{driver.team_name}</SizableText>
                  <SizableText fontFamily="$body">{driver.elo}</SizableText>
                  <SizableText fontFamily="$body">{driver.license}</SizableText>
                </Grid>
              ))
            }
          </Tabs.Content>
        ))
      }
    </Tabs>
  );
};
