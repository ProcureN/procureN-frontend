import { createContext, useState } from 'react';

export const EmailContext = createContext(null);

export const EmailProvider = (props) => {
  const [email, setEmail] = useState('a9860290373@gmail.com');
  return (
    <EmailContext.Provider value={{ email,setEmail }}>
      {props.children}
    </EmailContext.Provider>
  );
};
