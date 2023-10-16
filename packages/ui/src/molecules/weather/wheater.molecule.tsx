import { Cloud, ThermometerSun, CloudRain, CloudCog } from "@tamagui/lucide-icons";
import { XStack, Paragraph } from "tamagui";
import { WeatherProps } from "./props";
import { memo } from "react";

const WeatherMolecule: React.FC<WeatherProps> = ({ cloudLevel, ambientTemp, rain, weatherRandomness }) => {
  return (
    <XStack space="$2" ai="center">
      <Cloud />
      <Paragraph>{(cloudLevel * 100).toPrecision(2)}%</Paragraph>
      <ThermometerSun />
      <Paragraph>{ambientTemp}°C</Paragraph>
      <CloudRain />
      <Paragraph>{(rain * 100).toPrecision(2)}%</Paragraph>
      <CloudCog />
      <Paragraph>{(weatherRandomness * 10).toPrecision(2)}%</Paragraph>
    </XStack>
  );
};

export const Weather = memo(WeatherMolecule);
