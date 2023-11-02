import React, { useCallback, useMemo } from 'react';

import { Button, Dialog, Select, XStack } from '@lfm-clone/ui';
import { X } from '@tamagui/lucide-icons';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { ApplicationState, useApplicationState } from '../provider';
import { Car, Race, User } from '../types';

type Params = {
  isOpen: boolean;
};

const signUpMutation = async (
  url: string,
  data: { arg: ApplicationState['registerInformation'] }
) => {
  const response = await fetch(`https://api2.lowfuelmotorsport.com/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2YzZGM0YTE2MTJmMzc1MjQyMDQ0Mzk1Yzc5NTg0NjJjY2U1MGVhMjFiMjgwMTkwNTZiZGQxNTE0ZWExZTQxMmQzZjFmNDJmZTg5MTFlN2UiLCJpYXQiOjE2NjgwNzMyMzAuNDQ1MDcsIm5iZiI6MTY2ODA3MzIzMC40NDUwNzEsImV4cCI6MTY5OTYwOTIzMC40NDM3OSwic3ViIjoiMTIzNTYiLCJzY29wZXMiOltdfQ.AJckDO1PvLFEt3hW2_DnrCoSVArzu0Xojvaw1_HHo7mxcItb0Q_uDDBTFAIKJbfFl3xTjSfj7CvZXBih4TLxlRR5LjbVWfGkNfBH-VSq8hJMiM1oSLIvmp4MTnOXu05ZaNdVY2U6cQ4ED50LvA1WZ55PNPC7cyCQfZET35QGdzn1r-mSbA4K0-UXCNV1jC14i4jjSiHml5g6-5fCsVgf5rA039B2cjKx73DOq8XPMpONYW7NRtEYReIggvdb318TzEAwruslzjBhP4eCazcpyh8kyOoaakG1174zZIeIsVdJigmCk1KmDbWmEABzOTR9j-vuDwgxkje4l1DmCVuG6760cutGGOxUyCtv6W-4Adz043KlF-dImXJ55taALRAIGx5lns1wNWfpF0k7W-X8uV1QmpkXqKTy3IN8NUP4V0ZTZiRdqh-Ae7VeOeA5KlLuwA8w9-ymNR6r-ZO_1mQx0BnwW5XGf4sSQCconXmMhRnpYMwb3_7hag6F1uygewKC5OqgjwFLcyVxm8Z-pnfbqzVtTUXEXIUvHquDiusxO1HD6xm2pfur5DQfdRUkOtakG3Mil2RC9oMD_BjzW5UhyJZTd2CK7nXuOWSbIhSp7em2GrpVS9ChBoRpGrL74_77iB9Q38Ta2tLO1YjwdDZDzlfQJM_TIrA3jFd7LeBu5oE',
    },
    body: JSON.stringify(data.arg),
  });

  return response.json();
};

export const RegisterDialog: React.FC<Params> = ({ isOpen }) => {
  const { state, setState } = useApplicationState();
  const { data } = useSWR<Car[]>('lists/getCars');
  const { data: event } = useSWR<Race>(`race/${state.raceId}`);
  const { data: user } = useSWR<User>('user');
  const { trigger, isMutating } = useSWRMutation(`race/${state?.raceId}/signUp`, signUpMutation);
  const { mutate } = useSWRConfig();

  const viableCars = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(
      (car) =>
        car.sim_id === 1 &&
        car.class === event?.server_settings.server_settings.settings.data.carGroup
    );
  }, [data, event]);

  const onCarChange = useCallback(
    (value: string) => {
      setState({
        ...state,
        registerInformation: {
          ...state.registerInformation,
          car_model: +value,
        },
        registerDialogOpen: true,
      });
    },
    [state]
  );

  const onRegister = useCallback(async () => {
    setState({
      ...state,
      registerDialogOpen: false,
    });

    await trigger({
      ...state.registerInformation,
      nachname: user?.nachname,
      vorname: user?.vorname,
      shortname: user?.shortname,
      origin: user?.origin,
      youtube_channel: user?.youtube_channel,
      twitch_channel: user?.twitch_channel,
    });

    await mutate(`race/${state.raceId}`, () => undefined, { revalidate: true });
    await mutate(`v2/seasons/getUpcomingSessions/${state.selectedSeries}`, () => undefined, {
      revalidate: true,
    });
    await mutate(`v2/seasons/getUpcomingSessions/${event?.event_id}`, () => undefined, {
      revalidate: true,
    });
  }, [user, state, mutate, trigger]);

  const lastValidCar = useMemo(() => {
    if (!event || !user) {
      return null;
    }

    const eventClass = event.server_settings.server_settings.settings.data.carGroup;

    return user.lastCars.find((car) => typeof car[eventClass] !== 'boolean')?.[eventClass];
  }, [data, state.registerInformation]);

  if (!data || !event || !user) {
    return null;
  }

  console.log(lastValidCar);

  return (
    <Dialog open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          bordered
          elevate
          key="content"
          gap="$4"
          $gtMd={{
            width: '500px',
          }}
          width="100%"
        >
          <XStack justifyContent="space-between">
            <Dialog.Title>Register</Dialog.Title>
            <Button
              icon={<X size="$1" />}
              variant="outlined"
              onPress={() => setState({ ...state, registerDialogOpen: false })}
            />
          </XStack>
          <Dialog.Description>
            <Select
              defaultValue={
                (lastValidCar as unknown as { model: number })?.model as unknown as string
              }
              onValueChange={onCarChange}
              options={viableCars.map((car) => ({
                label: car.car_name,
                value: car.car_id,
              }))}
            />
          </Dialog.Description>
          <Dialog.Close displayWhenAdapted asChild>
            <Button theme="alt1" aria-label="Register" onPress={onRegister} disabled={isMutating}>
              Register to Race
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
