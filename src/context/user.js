import { createContext, useContext, useReducer } from "react";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const initialState = {
  id: 0,
  name: "",
  ruc: "",
  email: "",
  status: false,
  photo: null,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "change": {
      return {
        id: action.payload.id,
        name: action.payload.name,
        ruc: action.payload.ruc,
        email: action.payload.email,
        status: action.payload.status,
        photo: action.payload.photo,
      };
    }
    case "delete": {
      return initialState;
    }
    case "change-avatar": {
      return {
        ...state,
        photo: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useUserDispatch = () => {
  return useContext(UserDispatchContext);
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

// Doc:
// https://stackoverflow.com/questions/50502664/how-to-update-the-context-value-in-a-provider-from-the-consumer
// https://www.youtube.com/watch?v=UVBUhi5Oaiw&list=TLPQMTAwNjIwMjNmTdLsBl0DIg&index=2
// https://react.dev/reference/react/useContext#updating-data-passed-via-context
// https://www.youtube.com/watch?v=ibbMm5ZO-KQ&list=TLPQMTAwNjIwMjPwoHDW4Hl59w&index=6
