const Sequelize = require('sequelize');
const sequelize = new Sequelize('project_web', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
  logging: false
});

/*
sequelize.authenticate().then(()=> {
  console.log("Connected to the database!");
}).catch((err)=> {
  console.log(`Falied to connect: ${err}!`);
})
*/

module.exports = {Sequelize, sequelize};