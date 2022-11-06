
import {Outlet, Navigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";


const ProtectedRoutes = () => {
                                const {currentUser} = useAuthContext();
                                console.log(`ProtectedRoutes ${JSON.stringify(currentUser)}`);

                                return (
                                             currentUser ? <Outlet replace/> : <Navigate to="/" />
                                        );
                              }


    const CheckRoutes = () => {
                                  const {currentUser} = useAuthContext();
                                  console.log(`CheckRoutes ${JSON.stringify(currentUser)}`);

                                  return (
                                             !currentUser ? <Outlet /> : <Navigate to="/chat" replace/>
                                          );
                              }



/*const ProtectedRoutes = ({children}) => {
                                                const {currentUser} = useAuthContext();

                                                if (!currentUser)
                                                {
                                                  return <Navigate to="/signin" />;
                                                }

                                                return children;
                                            }*/

export {ProtectedRoutes, CheckRoutes};
