import { matchedData, validationResult } from "express-validator";
import { ArticleModel } from "../models/article.model.js";

export const agregarArticle = async (req,res) => {
    try {
        const validationData = matchedData(req,{locations:["body"]});
        const article = await ArticleModel.create(validationData)
        return res.status(200).status({message:"article agregado con exito",article})
        
    } catch (error) {
        return res.status(500).json({message:"error al poder ver articles",error:error.message})
    }
}