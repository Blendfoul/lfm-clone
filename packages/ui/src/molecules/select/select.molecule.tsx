import { useMemo } from 'react';
import { Adapt, Select as SelectComponent, Sheet } from '../../atoms';
import { SelectMoleculeProps } from './props';

export const Select: React.FC<SelectMoleculeProps> = ({ options, placeholder, ...rest }) => {
  const optionChildren = useMemo(() => {
    return options.map((option, index) => (
        <SelectComponent.Item key={option.value} index={index} value={option.value.toString()}>
          <SelectComponent.ItemText>{option.label}</SelectComponent.ItemText>  
        </SelectComponent.Item>
      )
    );
  }, [options]);


  return (
    <SelectComponent {...rest}>
      <SelectComponent.Trigger>
        <SelectComponent.Value placeholder={placeholder} />
      </SelectComponent.Trigger>

      <Adapt platform="touch">
        <Sheet
          native={!!rest.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>


      <SelectComponent.Content zIndex={200000}>
        <SelectComponent.ScrollUpButton />
        <SelectComponent.Viewport>
          {optionChildren}
        </SelectComponent.Viewport>
        <SelectComponent.ScrollDownButton />
      </SelectComponent.Content>
    </SelectComponent>
  )
};
