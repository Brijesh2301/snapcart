import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "../lib/db";
import User from '@/models/User
import bcrypt from 'bcryptjs';


export const {handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "email", type:"email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request){
      
          await connectDb();
          const email = credentials?.email as string
          const password  = credentials?.password;
          const user = await User.findOne({
            email
          })

          if(!user) {
            throw new Error("No user found with this email");
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch){
            throw new Error("Incorrect password");
          }

          return {
            id: user._id,
            email: user.email,
            name:user.name,
            role:user.role
          }
          
         
      }
    }),
  ],

  callbacks:{
    //token ke ander user ka data store krna 
    jwt({token, user}){
     if(user){
      token.id = user.id,
      token.name = user.name,
      token.email = user.email,
      token.role = user.role
     }
     return token;
    },
    session({session, token})
  }
})