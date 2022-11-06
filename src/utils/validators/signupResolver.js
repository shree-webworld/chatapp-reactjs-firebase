import * as Joi from "joi";
import {joiResolver} from "@hookform/resolvers/joi";

const signupSchema = Joi.object({
                                  uname: Joi.string().required().pattern(new RegExp('^[a-zA-Z ]{2,30}$')).error( errors => {
                                                                                                                            // console.log(errors);
                                                                                                                            errors.forEach(err =>{
                                                                                                                                                    if(err.code == "string.empty")
                                                                                                                                                    {
                                                                                                                                                      err.message = "Username is required";

                                                                                                                                                    } else if (err.code == "string.pattern.base")
                                                                                                                                                      {
                                                                                                                                                          err.message = "Must be alphabets only. No special characters allowed";
                                                                                                                                                      }
                                                                                                                                                  }
                                                                                                                                            )
                                                                                                                              return errors;
                                                                                                                            }
                                                                                                               ),

                                  email: Joi.string().required().email( {minDomainSegments: 2,
                                                                          tlds: {allow: ["com", "net", "in", "org"]} } ).error( errors => {
                                                                                                                                            // console.log(errors);
                                                                                                                                            errors.forEach(err =>{
                                                                                                                                                                    if(err.code == "string.empty")
                                                                                                                                                                    {
                                                                                                                                                                      err.message = "Email is required";

                                                                                                                                                                    } else if (err.code == "string.email")
                                                                                                                                                                      {
                                                                                                                                                                          err.message = "Please enter a valid email";
                                                                                                                                                                      }
                                                                                                                                                                  }
                                                                                                                                                            )
                                                                                                                                              return errors;
                                                                                                                                            }
                                                                                                                                ),
                                  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error( errors => {
                                                                                                                                  // console.log(errors);
                                                                                                                                  errors.forEach(err =>{
                                                                                                                                                          if(err.code == "string.empty")
                                                                                                                                                          {
                                                                                                                                                            err.message = "Password is required";

                                                                                                                                                          } else if (err.code == "string.pattern.base")
                                                                                                                                                            {
                                                                                                                                                              err.message = "Password must be alphanumeric with min 6 characters. No special characters allowed";
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                  )
                                                                                                                                    return errors;
                                                                                                                                  }
                                                                                                                    ),

                                  confirm_password: Joi.string().required().valid( Joi.ref("password") ).error( errors => {
                                                                                                                            // console.log(errors);
                                                                                                                            errors.forEach(err =>{
                                                                                                                                                    if(err.code == "string.empty")
                                                                                                                                                    {
                                                                                                                                                      err.message = "Re-enter password is required";

                                                                                                                                                    } else if (err.code == "any.only")
                                                                                                                                                      {
                                                                                                                                                          err.message = "Password and Re-enter password should be same";
                                                                                                                                                      }
                                                                                                                                                  }
                                                                                                                                            )
                                                                                                                              return errors;
                                                                                                                            }
                                                                                                                    ),
                                    pic:Joi.any().required().error( errors =>{
                                                                            console.log(errors);
                                                                          }
                                                          )
                              });
export const signupResolver = joiResolver(signupSchema);
