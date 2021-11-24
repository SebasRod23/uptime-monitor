import React from 'react';

export interface IUserContext {
  login: () => void;
  logout: () => void;
}

const UserContext = React.createContext<IUserContext>({
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
export default UserContext;
