const {User} = require('./model/sequelize');
const {MongoUser} = require('./model/mongoose');
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

async function mongoCreateUser(user){
  return MongoUser.create(user,(error,user) => {
    if(error) {
      console.log(error);
    } else {
      console.log(user)
    }
  });
}

async function mongoFindUser(user){
  return MongoUser.find(user,(error,user) => {
    if(error) {
      console.log(error);
    } else {
      console.log(user)
    }
  });
}

module.exports = {
  getAllUser,
  createUser,
  mongoCreateUser,
  mongoFindUser
}