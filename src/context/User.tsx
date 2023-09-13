import { createContext, useContext, useReducer, type Dispatch } from "react";
import { UserData, ProviderProps } from "@/src/utils/Types";

interface Action {
  type: string;
  payload?: UserData | null;
  photoload?: string | null;
}

const initialState: UserData = {
  id: 0,
  name: "",
  ruc: "",
  email: "",
  photo: null,
  push: false,
  mailing: false,
};

const UserContext = createContext<{
  state: UserData;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const UserReducer = (state: UserData, action: Action): UserData => {
  switch (action.type) {
    case "change": {
      return {
        id: action.payload!.id,
        name: action.payload!.name,
        ruc: action.payload!.ruc,
        email: action.payload!.email,
        photo: action.payload!.photo,
        push: action.payload!.push,
        mailing: action.payload!.mailing,
      };
    }
    case "delete": {
      return initialState;
    }
    case "change-avatar": {
      return {
        ...state,
        photo: action.photoload!,
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

export const UserProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
