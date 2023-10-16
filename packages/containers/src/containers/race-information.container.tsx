import useSWR from "swr";
import { Race } from "../types";
import { useParams } from "solito/navigation";
import { XStack, Card, Image, Paragraph, Weather, YStack } from "@lfm-clone/ui";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { SignUp } from "../actions";

type Params = { id: string };

export const RaceInformation: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, error } = useSWR<Race>(`race/${id}`);

  if (error || !data) {
    return null;
  }

  return (
    <Card 
      animation="bouncy" 
      bordered 
      size="$4" 
      title={`${data.event.event_name} - #${data.race_id}`}
      height="fit-content"
      header={
        <>
          <Image 
            source={{ uri: `https://lowfuelmotorsport.com/assets/img/tracks/${data.track.thumbnail}` }} 
            alt={data.track.track_name} 
            width={350} 
            height={200}
            $platform-web={{
              loading: 'eager',
              priority: true,
              width: 370,
              height: 200,
              src: `https://lowfuelmotorsport.com/assets/img/tracks/${data.track.thumbnail}`,
              alt: data.track.track_name,
            }}
          />
          <Paragraph>{data.track.track_name}</Paragraph>
          <XStack space="$1" ai="center" jc="center" w="100%" pt="$2">
            <SignUp id={+id} />
          </XStack>
        </>
      }
      footer={
        <YStack space>
          <Paragraph>{utcToZonedTime(new Date(data.race_date), Intl.DateTimeFormat().resolvedOptions().timeZone).toLocaleString()}</Paragraph>
          <Weather {...data.server_settings.server_settings.event.data} />
        </YStack>
      }
    />
  );
};
