import useSWR from "swr";
import { Race } from "../types";
import { useParams } from "solito/navigation";
import { XStack, Spinner, Card, Heading, Image, Paragraph } from "@lfm-clone/ui";
import { Cloud, ThermometerSun, CloudRain, CloudCog } from "@tamagui/lucide-icons";

type Params = { id: string };

export const RaceInformation: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, error, isValidating } = useSWR<Race>(`race/${id}`);

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
    <Card animation="bouncy" bordered size="$4" flex={1}>
      <Card.Header padded>
        <Image source={{ uri: `https://lowfuelmotorsport.com/assets/img/tracks/${data.track.thumbnail}` }} alt={data.track.track_name} width={350} height={200} />
        <Heading>{data.event.event_name} - #{data.race_id}</Heading>
        <Paragraph>{data.track.track_name}</Paragraph>
      </Card.Header>
      <Card.Footer padded justifyContent="center">
        <XStack space="$2" ai="center" justifyContent="center">
          <Cloud />
          <Paragraph>{(data.server_settings.server_settings.event.data.cloudLevel * 100).toPrecision(2)}%</Paragraph>
          <ThermometerSun />
          <Paragraph>{data.server_settings.server_settings.event.data.ambientTemp}°C</Paragraph>
          <CloudRain />
          <Paragraph>{(data.server_settings.server_settings.event.data.rain * 100).toPrecision(2)}%</Paragraph>
          <CloudCog />
          <Paragraph>{(data.server_settings.server_settings.event.data.weatherRandomness * 10).toPrecision(2)}%</Paragraph>
        </XStack>
      </Card.Footer>
    </Card>
  );
};
