import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { media } from '../utils/styling';

const InputField = styled.input`
  background-color: white;
  border: 1px solid ${({ disabled }) => (disabled ? '#bcbcbc' : '#3a3a3a')};
  padding: 12px;

  ${media.tabletUp} {
    padding: 8px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;

  ${media.tabletUp} {
    max-width: 480px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 0 0 8px;
`;

const OptionalText = styled.p`
  font-size: 12px;
  margin: 0 0 0 8px;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  tag?: 'input' | 'textarea';
  label?: string;
  optional?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, tag = 'input', label, className, optional, ...props }, ref) => (
    <InputWrapper className={className}>
      {label && (
        <LabelWrapper>
          <label htmlFor={name}>{label}</label>

          {optional && <OptionalText>Optional</OptionalText>}
        </LabelWrapper>
      )}
      <InputField as={tag} name={name} ref={ref} {...props} />
    </InputWrapper>
  ),
);

Input.displayName = 'Input';
