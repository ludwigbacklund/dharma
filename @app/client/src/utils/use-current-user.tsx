import { createContext, useContext } from 'react';
import { useState } from 'react';

interface CurrentUserContextTypes {
  currentUserId: number;
  setCurrentUserId: (id: number) => void;
}

const CurrentUserContext = createContext<CurrentUserContextTypes>({
  currentUserId: 1,
  setCurrentUserId: () => {},
});

export const CurrentUserContextProvider: React.FC = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(1);

  return (
    <CurrentUserContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
