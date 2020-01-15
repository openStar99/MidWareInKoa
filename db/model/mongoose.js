const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stardb',{
  user:'',
  pass:'',
  poolSize:10
});
const mongodb = mongoose.connection;
mongodb.on('error',err => {
  console.log("mongodb error:" + err);
});
mongodb.on('open', () => {
console.log("star mongodb connected successfully")
 });

 const userSchema = new mongoose.Schema({
   name:String,
   description:String,
   age:Number,
   created_at:{
     type:Date,
     default:Date.now
   }
 });

 const MongoUser = mongoose.model('User',userSchema);

 module.exports = {
  MongoUser
 }