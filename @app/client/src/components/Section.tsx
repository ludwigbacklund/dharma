import styled from 'styled-components';

import { media } from '../utils/styling';

interface SectionProps {
  grow?: boolean;
  color?: string;
  boxShadow?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  grow,
  color,
  boxShadow,
  className,
  children,
}) => (
  <SectionWrapper grow={grow} color={color} boxShadow={boxShadow}>
    <SectionInnerWrapper className={className}>{children}</SectionInnerWrapper>
  </SectionWrapper>
);

const SectionWrapper = styled.section<Partial<SectionProps>>`
  padding: 16px;

  ${media.tabletUp} {
    padding: 16px 32px;
  }
`;

const SectionInnerWrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
`;
