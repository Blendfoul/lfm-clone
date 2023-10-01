import { Link } from "solito/link";
import { Session } from "../types";
import { User, Cloud, CloudCog, ThermometerSun, CloudRain, Clock } from '@tamagui/lucide-icons';

import { Card, H5, Image, Paragraph, XStack, YStack } from '@lfm-clone/ui';

export const SessionCard: React.FC<Session> = ({ track, race_id, race_date, season_week, registered, slots, weather_settings, start_times }) => {
  return (
    <Link href={`/session/${race_id}`}>
      <Card animation="bouncy" bordered size="$4">
        <Card.Header padded>
          <H5>Week {season_week} | {track.track_name}</H5>
          <XStack space="$1" ai="center">
          <User />
          <Paragraph>{registered} / {slots}</Paragraph>
          </XStack>
        </Card.Header>
        <Card.Footer padded backgroundColor="$white">
          <YStack space>
            <Paragraph>{new Date(race_date).toUTCString()}</Paragraph>
            <XStack space="$2" ai="center">
              <Cloud />
              <Paragraph>{weather_settings.cloudLevel * 100}%</Paragraph>
              <ThermometerSun />
              <Paragraph>{weather_settings.ambientTemp}°C</Paragraph>
              <CloudRain />
              <Paragraph>{weather_settings.rain * 100}%</Paragraph>
              <CloudCog />
              <Paragraph>{weather_settings.weatherRandomness * 10}%</Paragraph>
            </XStack>
            <XStack space="$2" ai="center">
              <Clock />
              <Paragraph>Race Start: {start_times.r}:00</Paragraph>
            </XStack>
          </YStack>
        </Card.Footer>
        <Card.Background borderRadius="$5">
          <Image 
            resizeMode="cover"
            alignSelf="center"
            source={{
              uri: `https://lowfuelmotorsport.com/assets/img/tracks/${track.thumbnail}`,
              height: 500,
              width: 500,
            }} 
          />
        </Card.Background>
      </Card>
    </Link>
  );
};
