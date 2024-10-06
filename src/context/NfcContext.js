import React, { createContext, useContext } from 'react';
import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente

const NfcContext = createContext();

export const useNfc = () => {
  return useContext(NfcContext);
};

export const NfcProvider = ({ children }) => {
    
  const { tagInfo, nfcError, scanHistory } = useNfcWithStorage(); // Hook que obtiene los datos

  return (
    <NfcContext.Provider value={{
         tagInfo, 
         nfcError, 
         scanHistory 


        }}>
      {children}
    </NfcContext.Provider>
  );
};
