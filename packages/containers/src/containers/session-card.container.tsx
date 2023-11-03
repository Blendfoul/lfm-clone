import { Session } from "../types";
import { User, Clock } from '@tamagui/lucide-icons';
import { utcToZonedTime } from 'date-fns-tz';

import { Card, Image, Paragraph, Weather, XStack, YStack } from '@lfm-clone/ui';
import { SignUp } from "../actions";

export const SessionCard: React.FC<Session> = ({ track, race_id, race_date, season_week, registered, slots, weather_settings, start_times }) => {
  return (
    <Card 
      animation="bouncy" 
      bordered 
      size="$4" 
      flex={1} 
      href={`/session/${race_id}`}
      title={`Week ${season_week} | ${track.track_name}`}
      header={
        <>
          <XStack width="100%" aspectRatio={21 / 9}>
            <Image 
              resizeMode="contain"
              overflow="hidden"
              width="100%"
              height="100%"
              source={{ uri: `https://lowfuelmotorsport.com/assets/img/tracks/${track.thumbnail}`, width: 370, height: 200 }}
              alt={track.track_name}
              $platform-web={{
                loading: 'eager',
                priority: true,
                fill: true,
                style: {
                  aspectRatio: '16 / 9',
                  objectFit: 'contain',
                  objectPosition: 'center',
                },
                src: `https://lowfuelmotorsport.com/assets/img/tracks/${track.thumbnail}`,
                alt: track.track_name,
              }}
            />
          </XStack>
          <XStack space="$1" ai="center">
            <User />
            <Paragraph>{registered} / {slots}</Paragraph>
          </XStack>
          <SignUp id={race_id} />
        </>
      }
      footer={
        <>
          <YStack space>
            <Paragraph>{utcToZonedTime(new Date(race_date), Intl.DateTimeFormat().resolvedOptions().timeZone).toLocaleString()}</Paragraph>
            <Weather {...weather_settings}  />
            <XStack space="$2" ai="center">
              <Clock />
              <Paragraph>Race Start: {start_times.r}:00</Paragraph>
            </XStack>
          </YStack>
        </>
      }
    />
  );
};
