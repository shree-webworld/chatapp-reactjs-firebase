import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { useAuthContext } from "./AuthProvider";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) =>
{
    const { currentUser } = useAuthContext();
    const INITIAL_STATE = {
                              user: {},
                              chatId: "null",
                          };

  const chatReducer = (state, action) =>
  {
    console.log(state, action);

    if(action.type === "CHANGE_USER")
    {
      return{
              user: action.payload,
              chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
            };
    }
    return state;
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
            <ChatContext.Provider value={{ data:state, dispatch }}>
              {children}
            </ChatContext.Provider>
        );
};

export const useChatContext = () => {
                                        return useContext(ChatContext);
                                    }
