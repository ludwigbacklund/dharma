import styled from 'styled-components';
import { ChangeEvent, createContext, useContext } from 'react';
import { useState } from 'react';

import { Toggle } from './Toggle';

interface TestModeContextTypes {
  testModeEnabled: boolean;
  setTestModeEnabled: (enabled: boolean) => void;
}

const TestModeContext = createContext<TestModeContextTypes>({
  testModeEnabled: false,
  setTestModeEnabled: () => {},
});

export const TestModeContextProvider: React.FC = ({ children }) => {
  const [testModeEnabled, setTestModeEnabled] = useState(false);

  return (
    <TestModeContext.Provider value={{ testModeEnabled, setTestModeEnabled }}>
      {children}
    </TestModeContext.Provider>
  );
};

export const useTestModeContext = () => {
  return useContext(TestModeContext);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  padding: 8px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 4px;
  width: max-content;
  z-index: 1;
`;

const Text = styled.span`
  margin-bottom: 4px;
`;

export const TestModeToggle = () => {
  const { setTestModeEnabled } = useTestModeContext();

  return (
    <Wrapper>
      <Text>Toggle customer mode</Text>
      <Toggle
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTestModeEnabled(e.target.checked)
        }
      />
    </Wrapper>
  );
};
