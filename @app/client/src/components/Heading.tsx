import styled from 'styled-components';
import { media } from '../utils/styling';

export const Heading = styled.h1`
  font-size: 24px;
  margin: 0 0 24px 0;

  ${media.tabletDown} {
    margin: 0 0 16px 0;
  }
`;
