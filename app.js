import "dotenv/config";
import express from "express";
console.log(process.env.PORT);
console.log(process.env.DB_HOST);

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`server funcionando en puerto ${PORT}`);
  console.log(`enlace http://localhost:${PORT} `);
});
