import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";

export const UserModel = sequelize.define(
  "User",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
    },
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });

ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "Articles" });

ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
