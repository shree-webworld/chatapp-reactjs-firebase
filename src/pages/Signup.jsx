
import { FormControl,FormLabel,FormErrorMessage,FormHelperText} from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Button, ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import {useEffect, useState, useContext} from 'react';
import Navbar from "../components/Navbar";
import signup_img from "../assets/signuppic.png";
import {useForm} from 'react-hook-form';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, storage, db} from "../utils/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useTitle } from 'react-haiku';
import {signupResolver} from "../utils/validators/signupResolver";
import {useAuthContext} from "../context/AuthProvider";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


export default function Signup()
{
  useTitle("WhatsChat - Signup");
  const base_url = import.meta.env.VITE_BASE_URL;
  const database_url = import.meta.env.VITE_DATABASE_URL;
  const {currentUser} = useAuthContext();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, getValues, reset , setFocus, setValue, setError, clearErrors} = useForm({resolver: signupResolver});
  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const handlePasswordIcon = () => setShowPassword(!showPassword) ;
  const handleConfirmPasswordIcon = () => setConfirmPassword(!showConfirmPassword) ;
  const [loading, setLoading] = useState(false);




  const onSubmit = async () =>{
                                  setLoading(true);
                                  try
                                  {
                                    let signupValues = getValues();
                                    let {uname, email, password, confirm_password, pic} = signupValues;
                                    let file = pic[0].name;
                                    console.log(`${uname}, ${email}, ${password}, ${confirm_password}, ${pic[0].name}, ${file} `);

                                    const res = await createUserWithEmailAndPassword(auth, email, password);
                                    console.log(res);
                                    toast({
                                                title: 'Signup Successfully',
                                                description: "We've created your account for you.",
                                                position: "top",
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                          });

                                    const storageRef = ref(storage, `images/${file + v4()}`);
                                    const metadata = {
                                      contentType: 'image/jpeg',
                                    };

                                    await uploadBytesResumable(storageRef, file).then(async (snapshot) => {
                                            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                                              console.log(`file ${downloadURL}`);
                                              try {
                                                //Update profile
                                                await updateProfile(res.user, {
                                                  displayName: uname,
                                                  photoURL: downloadURL,
                                                });
                                                //create user on firestore
                                                await setDoc(doc(db, "users", res.user.uid), {
                                                  uid: res.user.uid,
                                                  displayName: uname,
                                                  email,
                                                  password,
                                                  confirm_password,
                                                  photoURL: downloadURL,
                                                });

                                             await setDoc(doc(db, "userChats", res.user.uid), {});
                                             // navigate("/chat");
                                              } catch (err)
                                                {
                                                  console.log(err);
                                                  // setErr(true);
                                                  setLoading(false);
                                                }
                                            });
                                          });

                                  } catch (e)
                                    {
                                      console.log(e.message);
                                      setLoading(false);
                                      toast({
                                                  title: 'Signup error',
                                                  description: "Email is already registered !!!",
                                                  position: "top",
                                                  status: 'error',
                                                  duration: 3000,
                                                  isClosable: true,
                                            });
                                    }
                              }

                        useEffect(() => {
                                          setFocus("uname");
                                        }, [setFocus]);


  return(<>
            <Navbar />

              <div className="hero min-h-screen bg-green-100" style={{fontFamily: "'Poppins', sans-serif"}}>
                <div className="hero-content flex-col lg:flex-row-reverse bg-white rounded-lg">
                  <div className="text-center lg:text-left">
                    <figure><img src={signup_img} alt="signup_img" className="h-96 w-full"/>
                      <figcaption>
                        <h2>Already have an account?&nbsp;
                          <a onClick ={ () => navigate('/signin')} className="link link-accent link-hover">Sign in ‣</a>
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
                    <div className="card-body">
                      <h1 className="card-title text-2xl font-bold mb-4">Create Account</h1>
                      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>

                       <FormControl isInvalid={errors.uname}>
                         <FormLabel htmlFor="uname">Username :</FormLabel>
                         <InputGroup mb="4">
                           <Input variant="outline" name="uname" type="text" autoComplete="off" borderColor="gray.500" {...register("uname")} focusBorderColor='green.400' className="capitalize"/>
                           <InputLeftElement children={<i className="zmdi zmdi-account"></i>}/>
                         </InputGroup>
                         <FormErrorMessage mb="4">{errors.uname && errors.uname.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.email}>
                          <FormLabel htmlFor="email">Email :</FormLabel>
                          <InputGroup mb="4">
                           <Input variant="outline" name="email" type="email" autoComplete="off" borderColor="gray.500" {...register("email")} focusBorderColor='green.400'/>
                           <InputLeftElement children={<i className="zmdi zmdi-email"></i>}/>
                          </InputGroup>
                          <FormErrorMessage mb="4">{ errors.email?.message}</FormErrorMessage>
                         </FormControl>

                        <FormControl isInvalid={errors.password}>
                         <FormLabel htmlFor="password">Password :</FormLabel>
                         <InputGroup mb="4">
                           <Input variant="outline" name="password" type={showPassword ? 'text' : 'password'} autoComplete="off" borderColor="gray.500" {...register("password")} focusBorderColor='green.400'/>
                            <InputLeftElement children={<i className="zmdi zmdi-lock-outline"></i>}/>
                            <InputRightElement>
                               <Button  size='sm' onClick={handlePasswordIcon}>
                                  {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                               </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage mb="4">{errors.password?.message}</FormErrorMessage>
                         </FormControl>

                        <FormControl isInvalid={errors.confirm_password}>
                         <FormLabel htmlFor="confirm_password">Re-enter password :</FormLabel>
                         <InputGroup mb="4">
                           <Input variant="outline" name="confirm_password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="off" borderColor="gray.500" {...register("confirm_password")} focusBorderColor='green.400'/>
                           <InputLeftElement children={<i className="zmdi zmdi-lock"></i>}/>
                             <InputRightElement>
                                <Button  size='sm' onClick={handleConfirmPasswordIcon}>
                                   {showConfirmPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                                </Button>
                             </InputRightElement>
                         </InputGroup>
                         <FormErrorMessage mb="4">{errors.confirm_password?.message}</FormErrorMessage>
                       </FormControl>

                       <FormControl mb="2">
                         <FormLabel htmlFor="pic">Upload your picture :</FormLabel>
                           <input type="file" {...register("pic")} name="pic" className="text-sm file:input-md file:bg-green-50 file:text-green-700 file:border-0 file:rounded-full file:py-2 file:px-4 file:font-semibold hover:file:bg-green-100" required/>
                         <FormErrorMessage mb="4"></FormErrorMessage>
                        </FormControl>


                       <Button type="submit" isLoading={loading} size="md" colorScheme="whatsapp">Register</Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>


        </>)
}
