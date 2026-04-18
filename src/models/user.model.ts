import mongoose from "mongoose";

interface IUser {
  _id?:mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "deleveryBoy" | "admin";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    mobile:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:["user","deleveryBoy","admin"],
        default:"user"
    }

  },
  { timestamps: true },
);

//creating the model

const User=mongoose.models.User || mongoose.model("User", userSchema)

export default User

