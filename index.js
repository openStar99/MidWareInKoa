const koa = require('koa');
const app = new koa();


app.use(async (ctx,next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World</h1>'
});

app.use(async (ctx,next) => {
  console.log(1);
  await next();
  console.log("end 1");
})
console.log("----------------------");
app.use(async (ctx,next) => {
  console.log(2);
  //await next();
  console.log("end 2");
})
app.use(async (ctx,next) => {
  console.log(3);
  await next();
  console.log("end 3");
})
app.use(async (ctx,next) => {
  console.log(4);
  await next();
  console.log("end 4");
})


app.listen(3000,() => {
  console.log("server is running at http://localhost:3000")
});