import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("integradortlp","root","",{
host:"localhost",
dialect:"mysql",
timezone: "-03:00",
dialectOptions:{
    timezone: "local",
    dateStrings:true
},
})
export default sequelize;