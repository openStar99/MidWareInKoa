const {User} = require('./model/sequelize');
const {Op} = require('sequelize');
 
async function getAllUser(){
  return User.findAndCountAll({
    attributes:['id','user_name'],
    order:[
      ['id','DESC']
    ]
  })
}

async function createUser(user){
  return User.create(user);
}





module.exports = {
  getAllUser,
  createUser
}