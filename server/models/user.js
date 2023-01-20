import { DataTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

const User = sequelize.define("User", {
  email: {//coloana email, care este de tipul string
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },

  userType: {
    type: DataTypes.INTEGER,
  },
});

export {User}