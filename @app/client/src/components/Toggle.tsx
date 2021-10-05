import { ChangeEvent } from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
`;

const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  :before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const Input = styled.input`
  display: none;

  :focus + ${Slider} {
    box-shadow: 0 0 1px #2196f3;
  }

  :checked + ${Slider} {
    background-color: #2196f3;
  }

  :checked + ${Slider}:before {
    transform: translateX(13px);
  }
`;

export const Toggle = ({
  onChange,
  className,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <Switch className={className}>
      <Input type='checkbox' onChange={onChange} />
      <Slider />
    </Switch>
  );
};
