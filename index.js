const koa = require('koa');
const Router = require('koa-router');
const { sign } = require('jsonwebtoken');
const secret = 'star';
const jwt = require('koa-jwt')({secret});
const app = new koa();
const router = new Router();
const parentRouter = new Router();
const bodyParser = require('koa-bodyparser');
const admin  = require('./admin')();
const {getAllUser,createUser,mongoCreateUser,mongoFindUser} = require('./db/index');
const jsonMIME = 'application/json';
const jimp = require('jimp');
const path = require('path');
const session = require('koa-session');
const CONFIG = require('./config/session/index');
const {client} = require('./db/model/redis');
console.log(path.resolve('/fcc/foo','/fbb'));
console.log(path.resolve(__dirname));
// router.post('/login',async (ctx,next) =>{
  
// });
app.use(bodyParser());
app.keys = ['star'];

router.get('/starkoa/guestInfo',async (ctx,next) => {
  console.log("hit all starkoa 1");
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World' + ctx.state.user.username + '</h1>'
  await next();
  console.log("hit all starkoa 2");
}).get('/starkoa/adminInfo' ,async (ctx,next) => {
  console.log("hit all adminInfo 1");
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World' + ctx.state.user.username + '</h1>'
  await next();
  console.log("hit all adminInfo 2");
}).get('/starkoa/exAdminInfo',admin,async (ctx,next) => {
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World' + ctx.state.user.username + '</h1>';
  await next();
  console.log(next);
}).get('/starkoa/:id/:name',async (ctx,next) => {
  console.log(ctx.params);
  ctx.response.body = '<h1>HOME page /:id/:name</h1>';
}).get('/starkoa/jimp',async (ctx,next) => {
  console.log("jimp");
  const response = jimp.read("static/Capture.PNG",(err,img) => {
    img.resize(1122,647)
      .quality(80)
      .write("static/Capture-test2.PNG");
  })
  console.log(response);
}).get('/starkoa/getRedisSess',async (ctx,next) => {
  console.log("getRedisSess");
  const sess = await client.hmset('star','star1','star2');
}).post('/starkoa/createUser',async (ctx,next) => {
  const user = ctx.request.body;
  await console.log('await test');
  await createUser(user);
  ctx.type = jsonMIME;
  ctx.body = {
    status:0
  }
}).post('/starkoa/mongodb/createUser',async (ctx,next) => {
  const user = ctx.request.body;
  await console.log('await test');
  await mongoCreateUser(user);
  ctx.type = jsonMIME;
  ctx.body = {
    status:0
  }
}).post('/starkoa/mongodb/findUser',async (ctx,next) => {
  const user = ctx.request.body;
  const userRes = await mongoFindUser(user);
  await console.log(userRes);
  ctx.type = jsonMIME;
  ctx.body = {
    status:0,
    userRes
  }
}).get('/starkoa/getAllUser',async (ctx,next) => {
    const user = await getAllUser();
    ctx.type = jsonMIME;
    ctx.body = {
      status:0,
      data:user
    };
}).all('/starkoa', async (ctx,next) =>{
  console.log("hit all 1");
  await next();
  console.log("hit all 2");
  ctx.set("Access-Control-Allow-Origin","https://www.baidu.com");
});

parentRouter.post('/star/login',async (ctx,next) => {
  const { user } = ctx.request.body;
  if(user && user.username){
    let { username } = user;
    const token = sign({username},secret,{expiresIn: '1h'});
    ctx.body = {
      message:'Get Token Success',
      code:1,
      token
    };
  }
  else{
    ctx.body = {
      message:'Param Error',
      code: -1
    }
  }
}).use('/star/user',jwt,router.routes(),router.allowedMethods());

app.use(parentRouter.routes());
app.use(session(CONFIG,app));
app.use(async (ctx,next) => {
  // console.log(1);
  // await next();
  if(ctx.path === '/favicon.ico') return;
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + 'Views';
  console.log("end 1");
})


app.listen(3000,() => {
  console.log("server is running at http://localhost:3000")
});

module.exports = {
  app
}