module.exports = () => {
  return async (ctx,next) => {
    if(ctx.state.user.username === 'admin') {
      next()
      console.log("no next()");
    } else {
      ctx.body = {
        code:-1,
        message:"Authorization Error, you have no admin privilege"
      }
    }
  }
}