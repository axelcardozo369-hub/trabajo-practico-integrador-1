import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
export const ArticleModel = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tittle: {
      type: DataTypes.STRING(200),
      allownull: false,
      validate: {
        len: [3, 200],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allownull: false,
      validate: {
        len: [3, 200],
      },
    },
    excerpt: {
      type: DataTypes.STRING(500),
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      default: "published",
      allownull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
