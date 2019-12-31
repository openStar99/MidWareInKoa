const Sequelize = require('sequelize');
const sequelize = new Sequelize('stardb','root','detective99',{
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases:false,
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  }
});

sequelize.authenticate().then(()=>{
  console.log('Connected');
}).catch(err=>{
  console.log('Connection failed')
});

const User = sequelize.define('User', {
  id: {
    type:Sequelize.INTEGER,
    unique:true,
    primaryKey:true,
    allowNull:false
  },
  user_name: {
    type:Sequelize.STRING,
    allowNull:true
  },
  user_email: {
    type:Sequelize.STRING,
    allowNull:true
  },
  sex: {
    type:Sequelize.INTEGER,
    allowNull:true
  },
  note: {
    type:Sequelize.STRING,
    allowNull:true
  },
  head_img: {
    type:Sequelize.INTEGER,
    allowNull:true
  },
  country_id: {
    type:Sequelize.INTEGER,
    allowNull:true
  },
  create_at: {
    type:Sequelize.DATE,
    allowNull:true
  }
},{
  timestamps:true,
  createdAt:'create_at',
  tableName:'t_user'
}
);

module.exports = {
  User
}