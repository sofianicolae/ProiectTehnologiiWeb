import { DataTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

const Grade = sequelize.define("Grade", {
  idProject: {
    type: DataTypes.INTEGER,
  },

  grade: {
    type: DataTypes.FLOAT,
  },

  idUser: {
    type: DataTypes.INTEGER,
  },
});

export {Grade}

