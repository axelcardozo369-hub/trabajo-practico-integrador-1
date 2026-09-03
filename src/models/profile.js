import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { createServer } from "mysql2";
export const ProfileModel = sequelize.define("Profile",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allownull:false,
        unique:true,
        references:{
            model:UserModel,
            key:"id"
        }
    },
    first_name:{
        type:DataTypes.STRING(50),
        allownull:false,
    },
    last_name:{
        type:DataTypes.STRING(50),
        allownull:false
    },
    biography:{
        type:DataTypes.TEXT,
        allownull:true
    },
    avatar_url:{
        type:DataTypes.STRING(255),
        allownull:false
    },
    birth_date:{
        type:DataTypes.DATE,
        allownull:false,
    }
},{
    timestamps:true,
    createAt:"created_at",
    updateAt:"update_at"
})