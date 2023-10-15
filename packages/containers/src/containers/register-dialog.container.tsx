import React, { useCallback, useMemo } from 'react';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Car, Race, User } from "../types";
import { Button, Dialog, Select, XStack } from "@lfm-clone/ui";
import { useParams } from 'solito/navigation';
import { useApplicationState } from '../provider';
import { X } from '@tamagui/lucide-icons';

type Params = {
  isOpen: boolean;
}

type UrlParams = { id: string };

export const RegisterDialog: React.FC<Params> = ({ isOpen }) => {
  const { data } = useSWR<Car[]>('lists/getCars');
  const { id } = useParams<UrlParams>();
  const { data: event } = useSWR<Race>(`race/${id}`);
  const { data: user } = useSWR<User>('user');
  const { state, setState } = useApplicationState();

  const viableCars = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(car => car.sim_id === 1 && car.class === event?.server_settings.server_settings.settings.data.carGroup);
  }, [data]);

  const onCarChange = useCallback((value: string) => {
    setState({
      ...state,
      registerInformation: {
        ...state.registerInformation,
        car_model: +value,
      },
      registerDialogOpen: true,
    });

    console.log(state, value);
  }, []);

  const onRegister = useCallback(() => {
    setState({
      ...state,
      registerInformation: {
        ...state.registerInformation,
        nachname: user?.nachname,
        vorname: user?.vorname,
        shortname: user?.shortname,
        origin: user?.origin,
        youtube_channel: user?.youtube_channel,
        twitch_channel: user?.twitch_channel,
      },
      registerDialogOpen: false,
    });

    console.log(state.registerInformation);
  }, [user]);

  const lastValidCar = useMemo(() => {
    if (!event || !user) {
      return null;
    }

    const eventClass = event.server_settings.server_settings.settings.data.carGroup;

    return user.lastCars.find(car => car[eventClass]);
  }, [data, state.registerInformation]);

  if (!data || !event || !user) {
    return null;
  }

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
            <Button icon={<X size="$1" />} variant="outlined" onPress={() => setState({ ...state, registerDialogOpen: false })} />
          </XStack>
          <Dialog.Description>
            <Select
              value={state.registerInformation?.car_model?.toString()}
              onValueChange={onCarChange}
              options={viableCars.map(car => ({
                label: car.car_name,
                value: car.car_id,
              }))}
            />
          </Dialog.Description>
          <Dialog.Close displayWhenAdapted asChild>
            <Button theme="alt1" aria-label="Close" onPress={onRegister}>
              Register to Race
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
