import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useEffect, useState} from 'react';
import signin_img from "../assets/signinpic.png";
import { Input } from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/config/firebase";
import { useTitle } from 'react-haiku';
import { useToast } from '@chakra-ui/react';
import {useAuthContext} from "../context/AuthProvider";



export default function Signin()
{
  useTitle("WhatsChat - Signin");

  const { register, handleSubmit, watch, formState: { errors }, getValues, reset , setFocus} = useForm();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let {currentUser} = useAuthContext();
  console.log(from);

  const toast = useToast();


  useEffect(() => {
                      setFocus("email");

                  }, [setFocus]);

  const onSubmit = async () =>{
                                  try
                                  {
                                    let email = getValues("email");
                                    let password = getValues("password");
                                    const res = await signInWithEmailAndPassword(auth, email, password);
                                    // console.log(`Signin res ${JSON.stringify(res)}`);
                                    // navigate("/chat", {replace: true});

                                  }catch (e)
                                    {
                                      console.log(e.message);
                                      toast({
                                                  title: 'Signin error',
                                                  description: "Invalid credentials !!!",
                                                  position: "top",
                                                  status: 'error',
                                                  duration: 3000,
                                                  isClosable: true,
                                            });

                                    }
                              }

  return(<>
    <Navbar />
    <div className="hero min-h-screen bg-green-100" style={{fontFamily: "'Poppins', sans-serif"}}>
      <div className="hero-content flex-col lg:flex-row-reverse bg-white rounded-lg sm:my-10">
        <div className="text-center lg:text-left">
          <figure><img src={signin_img} alt="signup_img" className="h-96 w-full"/></figure>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">Sign-In</h1>
            <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6 ">
              <Input type="email" label="Email" {...register("email")} autoComplete="off" color="teal" icon={<i className="zmdi zmdi-email"></i>} required/>
            </div>

            <div className="w-full mb-6 ">
              <Input type="password" label="Password" {...register("password")} autoComplete="off" color="teal" icon={<i className="zmdi zmdi-lock"></i>} required/>
            </div>

              <button type="submit" className="btn btn-primary mt-6 bg-[#138D7E] hover:bg-[#48C958] border-[#138D7E]">Login</button>
              <div className="divider text-gray-500 text-xs mt-7">New to WhatsChat ?</div>
              <a onClick ={ () => navigate('/signup')} className="link link-accent link-hover text-center">Create your WhatsChat account</a>
            </form>
          </div>
        </div>
      </div>
    </div>

        </>);
}
