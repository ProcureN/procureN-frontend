import { createContext, useState } from 'react';

export const EmailContext = createContext(null);

export const EmailProvider = (props) => {
  const [email, setEmail] = useState('');
  return (
    <EmailContext.Provider value={{ email,setEmail }}>
      {props.children}
    </EmailContext.Provider>
  );
};
