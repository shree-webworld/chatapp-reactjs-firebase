import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {ProtectedRoutes, CheckRoutes} from "./utils/ProtectedRoutes";
import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "./context/AuthProvider";



export default function App()
{
  const {currentUser} = useAuthContext();

  /*const CheckRoutes = () => {
                                if (!currentUser)
                                {
                                    return <Outlet />;
                                }

                                return <Navigate to="/chat" />;
                            };

    const ProtectedRoutes = ({children}) => {
                                                if (currentUser)
                                                {
                                                  return children;
                                                  // return <Navigate to="/signin" />;
                                                }

                                                  return <Navigate to="/signin" />;
                                                  // return children;
                                            };*/


  return(<>

            <Routes>
              <Route element={<CheckRoutes />}>
                <Route index element={ <Home /> } />
                <Route path="/signin" element={ <Signin /> } />
                <Route path="/signup" element={ <Signup /> } />
              </Route>

              <Route element={ <ProtectedRoutes /> }>
                <Route path='/chat' element={ <Chat /> } />
              </Route>
              {/*<Route path='/chat' element={<ProtectedRoutes> <Chat /> </ProtectedRoutes>} />*/}
              <Route path='/*' element={<Navigate to="/" />} />
          </Routes>

        </>)
}
