import useSWR from "swr";
import { Race } from "../types";
import { useParams } from "solito/navigation";
import { XStack, Spinner, Tabs, SizableText, Separator, H5 } from "@lfm-clone/ui";

type Params = { id: string };

export const RaceEntries: React.FC = () => {
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
    <Tabs defaultValue="" width="100%" orientation="horizontal" flexDirection="column">
      <Tabs.List>
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
      <Separator />
      <Tabs.Content value="entries">
      <H5>Profile</H5>
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
