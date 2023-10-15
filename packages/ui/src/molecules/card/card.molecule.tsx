import { CardMoleculeProps } from "./props";
import { Card as CardComponent, H5 } from '../../atoms';
import { useLink } from "solito/navigation";

export const Card: React.FC<CardMoleculeProps> = ({ title, footer, header, href, ...rest }) => {
  const link = useLink({
    href: href ?? '',
  });
  
  return (
    <CardComponent {...(href ? link : {})} {...rest}>
      <CardComponent.Header padded>
        <H5>{title}</H5>
        {header}
      </CardComponent.Header>
      <CardComponent.Footer padded>
        {footer}
      </CardComponent.Footer>
    </CardComponent>
  )
};
