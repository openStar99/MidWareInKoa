

const {client} = require('../../db/model/redis');
const {promisify} = require('util');
const hgetallAsync = promisify(client.hgetall).bind(client);



  const store = {
    get:async (key,maxAge) => {
      const res =  await hgetallAsync(key);
      console.log(key+ '/n' + res)
      return res;
    },
    set : (key,sess,maxAge) => {
      console.log(key+ '/n' + sess)
      client.hmset(key,sess);
    },
    destory: (key) => {
      client.hdel(key);
    }
  };

  const CONFIG = {
    key:"koa:sessKey",
    maxAge: 8640000,
    overwrite:true,
    httpOnly:true,
    signed:true,
    store
  }
  
  module.exports = {
    CONFIG
  }
