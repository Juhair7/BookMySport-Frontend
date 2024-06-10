// AvatarContext.js
import React, { createContext, useState, useContext } from 'react';

 export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
