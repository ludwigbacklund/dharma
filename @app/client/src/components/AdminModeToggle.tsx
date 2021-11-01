import styled from 'styled-components';
import { ChangeEvent, createContext, useContext } from 'react';
import { useState } from 'react';

import { Toggle } from './Toggle';

interface AdminModeContextTypes {
  adminModeEnabled: boolean;
  setAdminModeEnabled: (enabled: boolean) => void;
}

const AdminModeContext = createContext<AdminModeContextTypes>({
  adminModeEnabled: false,
  setAdminModeEnabled: () => {},
});

export const AdminModeContextProvider: React.FC = ({ children }) => {
  const [adminModeEnabled, setAdminModeEnabled] = useState(false);

  return (
    <AdminModeContext.Provider
      value={{ adminModeEnabled, setAdminModeEnabled }}
    >
      {children}
    </AdminModeContext.Provider>
  );
};

export const useAdminModeContext = () => {
  return useContext(AdminModeContext);
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

export const AdminModeToggle = () => {
  const { adminModeEnabled, setAdminModeEnabled } = useAdminModeContext();

  return (
    <Wrapper>
      <Text>Toggle admin mode</Text>
      <Toggle
        checked={adminModeEnabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAdminModeEnabled(e.target.checked)
        }
      />
    </Wrapper>
  );
};
