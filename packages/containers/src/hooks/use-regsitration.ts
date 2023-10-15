import { useCallback, useEffect, useState } from 'react';

import { isAfter, isBefore } from 'date-fns';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { useParams } from 'solito/navigation';
import useSWR from 'swr';

import { Season, User } from '../types';
import { UpcomingSession } from '../types/upcoming-session';

type Props = {
  signUpStart?: string;
  signUpCloses?: string;
  isLive?: number;
  eventId?: number;
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

export const useRegistration = ({ signUpCloses, signUpStart, isLive, eventId }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [timeLeft, setTimeLeft] = useState<string>();
  const [closed, setClosed] = useState<boolean>(false);
  const [validSignUp, setValidSignUp] = useState<boolean>(true);
  const { data: user } = useSWR<User>('user');
  const { data: eventData } = useSWR<Season>('seasons/getMinifiedSeasonBySim');
  const { data: raceData } = useSWR<UpcomingSession>(`v2/seasons/getUpcomingSessions/${eventId}`);

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

    if (isAfter(now, signupStartsDate) && isBefore(now, signupClosesDate)) {
      return setValidSignUp(true);
    }

    return setValidSignUp(!hasSufficientSr);
  }, [isLive, signUpCloses, signUpStart, user?.safety_rating, event?.min_sr, event?.max_sr]);

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

    if (isBefore(signupStartsDate, now)) {
      const interval = humanizeFutureToNow(signupStartsDate);

      setTimeLeft(interval);
    }

    if (isBefore(now, signupClosesDate)) {
      const interval = humanizeFutureToNow(signupClosesDate);

      setTimeLeft(interval);
    }

    if (isAfter(now, signupClosesDate)) {
      setClosed(true);
    }
  }, [signUpStart, signUpCloses]);

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
    closed,
    validSignUp,
    signedUp: raceDetails?.signedUp ?? false,
  };
};
