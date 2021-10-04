import styled from 'styled-components';

const ErrorSymbol = styled.span`
  font-weight: bold;
  font-size: 16px;
  margin-right: 4px;
  color: #f44336;
`;

export const ErrorText = styled.p`
  margin-top: 8px;
`;

interface Props {
  message: string;
  className?: string;
}

export const ErrorNotice: React.FC<Props> = ({ message, className }) => (
  <ErrorText className={className}>
    <ErrorSymbol>!</ErrorSymbol>
    {message}
  </ErrorText>
);
