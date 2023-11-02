import { Tabs, SizableText, Separator, H5 } from '@lfm-clone/ui';
import { useParams } from 'solito/navigation';
import useSWR from 'swr';

import { EntryListContainer } from './entry-list.container';
import { Race } from '../types';

type Params = { id: string };

export const RaceEntries: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, error } = useSWR<Race>(`race/${id}`, { revalidateOnFocus: true });

  if (error || !data) {
    return null;
  }

  return (
    <Tabs defaultValue="entries" width="100%" orientation="horizontal" flexDirection="column">
      <Tabs.List $platform-native={{ justifyContent: 'center' }}>
        <Tabs.Tab value="entries">
          <SizableText fontFamily="$body">Entry List</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="quali">
          <SizableText fontFamily="$body">Qualifying</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="race">
          <SizableText fontFamily="$body">Race Results</SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator paddingVertical="$1.5" />
      <Tabs.Content value="entries">
        <EntryListContainer />
      </Tabs.Content>
      <Tabs.Content value="quali">
        <H5>Profile</H5>
      </Tabs.Content>
      <Tabs.Content value="race">
        <H5>Profile</H5>
      </Tabs.Content>
    </Tabs>
  );
};
