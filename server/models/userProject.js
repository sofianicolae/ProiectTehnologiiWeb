import { DataTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

const UserProject = sequelize.define("UserProject", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: DataTypes.STRING,
});

export {UserProject}
