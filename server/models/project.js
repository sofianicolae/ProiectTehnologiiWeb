import { DataTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,//nu avem voie sa punem null, adica mereu trebuie sa ii dam un titlu
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  videoLink: {
    type: DataTypes.STRING,
  },
});

export {Project}
