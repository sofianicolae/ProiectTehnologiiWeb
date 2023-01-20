import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/bazadate.db",
});

sequelize.sync({ force: false }).then(() => {
  console.log("All models were synchronized succesfully");
});

export {sequelize};
