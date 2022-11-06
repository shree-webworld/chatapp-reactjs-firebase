
import {createContext, useEffect, useState, useContext} from "react";
import {auth} from "../utils/config/firebase";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
                                          let [currentUser, setCurrentUser] = useState();
                                          const navigate = useNavigate();

                                          useEffect(() => {
                                                            onAuthStateChanged(auth, (user) => {
                                                                                                  if(user)
                                                                                                  {
                                                                                                    setCurrentUser(user);
                                                                                                    console.log(`AuthProvider ${JSON.stringify(user)}`);
                                                                                                  }
                                                                                               }
                                                                              );
                                                          },[]);

                                         const logOut = async () =>{
                                                                        await signOut(auth);
                                                                        setCurrentUser();
                                                                        navigate("/");
                                                                    }

                                          return (
                                                    <AuthContext.Provider value={{currentUser, logOut}}>
                                                      {children}
                                                    </AuthContext.Provider>
                                                  );
                                      }


    const useAuthContext = () => {
                                      return useContext(AuthContext);
                                  }

export {AuthContext, AuthProvider, useAuthContext}
