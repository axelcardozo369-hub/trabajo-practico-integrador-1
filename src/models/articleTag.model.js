import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
export const ArticleTagModel = sequelize.define("ArticleTag",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
   article_id:{
    type:DataTypes.INTEGER,
    allownull:false,
    references:{
        model: ArticleModel,
        key:"id"
    }
   },
   tag_id:{
    type:DataTypes.INTEGER,
    allownull:false,
    references:{
        model:TagModel,
        key:"id"
    }
   },

},{
    timestamps: true,      
    paranoid: true,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
    })