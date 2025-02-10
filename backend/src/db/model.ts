const Sequelize = require("sequelize");

const db = {};
export const sequelize = new Sequelize("jobportal", "jyotip", "Jyoti@2002", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database: ", error);
  });