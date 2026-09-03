import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './src/config/database.js';
import { UserModel } from './src/models/user.model.js';
import { TagModel } from './src/models/tag.model.js';
import { ProfileModel } from './src/models/profile.js';
import { ArticleModel } from './src/models/article.model.js';
import { ArticleTagModel } from './src/models/articleTag.model.js';
import { userRouter } from './src/routes/user.routes.js';


dotenv.config();
console.log('Puerto configurado:', process.env.PORT);
console.log('Base de datos:', process.env.DB_NAME);
console.log('Usuario de DB:', process.env.DB_USER);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api",userRouter)
const conexionBaseDatos = async () => {
try {
  await sequelize.sync({force:true})
  console.log("Conexion de la base de datos con exitos")
} catch (error) {
  console.log("Error al conectar con la base de datos",error)
}  
}

app.listen(PORT, () => {
  console.log("server corriendo con exito");
  console.log(`server: http://localhost:${PORT}`);
})
conexionBaseDatos();