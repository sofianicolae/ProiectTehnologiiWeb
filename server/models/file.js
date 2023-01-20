import { DataTypes } from "sequelize"
import { sequelize } from "../sequelize.js"


const File = sequelize.define("File", {
  fileName: {
    type: DataTypes.STRING,
  },

  file: {
    type: DataTypes.TEXT,
  },

  idProject: {
    type: DataTypes.INTEGER,
  },
});

export {File}
