import useSWR from "swr";
import { Race } from "../types";
import { useParams } from "solito/navigation";
import { XStack, Card, Image, Paragraph, Button, Weather, YStack } from "@lfm-clone/ui";
import { useApplicationState } from "../provider";
import { useCallback } from "react";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { useRegistration } from "../hooks/use-regsitration";

type Params = { id: string };

export const RaceInformation: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, error } = useSWR<Race>(`race/${id}`);
  const { setState, state } = useApplicationState();
  const { closed, timeLeft, validSignUp } = useRegistration({
    eventId: data?.event_id,
    isLive: data?.isLive,
    signUpCloses: data?.event.signup_stop,
    signUpStart: data?.event.signup_start,
  });

  console.log(closed, timeLeft, validSignUp);

  const onRegister = useCallback(() => {
    setState({
      ...state,
      registerDialogOpen: true,
    });
  }, []);

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
            <Button w="100%" onPress={onRegister}>Register</Button>
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
