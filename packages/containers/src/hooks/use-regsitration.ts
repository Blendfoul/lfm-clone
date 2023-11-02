import { useCallback, useEffect, useState } from 'react';

import { isAfter, isBefore } from 'date-fns';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import useSWR from 'swr';

import { Season, User } from '../types';
import { UpcomingSession } from '../types/upcoming-session';

type Props = {
  isLive?: number;
  eventId?: number;
  id: number;
};

function humanizeFutureToNow(targetDate: Date): string {
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return '00:00:00'; // Handle the case where the target date is in the past
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  const formattedHours = formatTime(hours);
  const formattedMinutes = formatTime(minutes);
  const formattedSeconds = formatTime(seconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const useRegistration = ({ isLive, eventId, id }: Props) => {
  const [timeLeft, setTimeLeft] = useState<string>();
  const [closed, setClosed] = useState<boolean>(false);
  const [validSignUp, setValidSignUp] = useState<boolean>(true);
  const { data: user } = useSWR<User>('user');
  const { data: eventData } = useSWR<Season>('seasons/getMinifiedSeasonBySim');
  const { data: raceData } = useSWR<UpcomingSession>(`v2/seasons/getUpcomingSessions/${eventId}`);
  const { data: userInRace } = useSWR<{ sucess: boolean }>(`race/${id}/amIIn`);

  const raceDetails = raceData?.data?.find(({ race_id }) => race_id === +id);

  const event = eventData?.series?.['0']?.series?.find((item) => item.event_id === eventId);

  const checkSignUpEnabled = useCallback(() => {
    const now = utcToZonedTime(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);

    const userSr = +(user?.safety_rating ?? 0);
    const minSr = event?.min_sr ?? -1;
    const maxSr = event?.max_sr === 0 ? 10 : event?.max_sr ?? 10;

    const hasSufficientSr = userSr >= minSr && userSr <= maxSr;

    if (!raceDetails?.signupCloses || !raceDetails?.signupStart) {
      return setValidSignUp(false);
    }

    const signupStartsDate = utcToZonedTime(
      new Date(raceDetails.signupStart),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const signupClosesDate = utcToZonedTime(
      new Date(raceDetails.signupCloses),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    const isInSignUpPeriod = isAfter(now, signupStartsDate) && isBefore(now, signupClosesDate);

    if (isInSignUpPeriod) {
      return setValidSignUp(true);
    }

    return setValidSignUp(!hasSufficientSr && isInSignUpPeriod);
  }, [isLive, user?.safety_rating, event?.min_sr, event?.max_sr]);

  const countUntilSignUp = useCallback(() => {
    checkSignUpEnabled();

    const now = utcToZonedTime(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);

    if (!raceDetails?.signupCloses || !raceDetails?.signupStart) {
      return setClosed(false);
    }

    const signupStartsDate = utcToZonedTime(
      new Date(raceDetails.signupStart),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const signupClosesDate = utcToZonedTime(
      new Date(raceDetails.signupCloses),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    if (isBefore(now, signupStartsDate)) {
      const interval = humanizeFutureToNow(signupStartsDate);

      setTimeLeft(interval);
      setClosed(true);
    }

    if (isBefore(now, signupClosesDate)) {
      const interval = humanizeFutureToNow(signupClosesDate);

      setTimeLeft(interval);
      setClosed(false);
    }

    if (isAfter(signupClosesDate, now)) {
      setClosed(true);
    }
  }, [raceDetails?.signupCloses, !raceDetails?.signupStart]);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    const id = setInterval(countUntilSignUp, 1000);

    if (isLive === 1) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [countUntilSignUp, raceDetails?.signedUp, isLive, eventId]);

  return {
    timeLeft,
    closed: !closed,
    validSignUp,
    signedUp: userInRace?.sucess ?? false,
  };
};
