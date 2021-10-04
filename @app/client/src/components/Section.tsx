import styled from 'styled-components';

import { media } from '../utils/styling';

interface SectionProps {
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ className, children }) => (
  <SectionWrapper>
    <SectionInnerWrapper className={className}>{children}</SectionInnerWrapper>
  </SectionWrapper>
);

const SectionWrapper = styled.section<Partial<SectionProps>>`
  padding: 24px 16px;

  ${media.tabletUp} {
    padding: 24px 32px;
  }
`;

const SectionInnerWrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
`;
