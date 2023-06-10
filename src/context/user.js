import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Doc:
// https://stackoverflow.com/questions/50502664/how-to-update-the-context-value-in-a-provider-from-the-consumer
// https://www.youtube.com/watch?v=UVBUhi5Oaiw&list=TLPQMTAwNjIwMjNmTdLsBl0DIg&index=2
// https://react.dev/reference/react/useContext#updating-data-passed-via-context
// https://www.youtube.com/watch?v=ibbMm5ZO-KQ&list=TLPQMTAwNjIwMjPwoHDW4Hl59w&index=6
