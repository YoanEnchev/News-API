import { Context } from 'koa';

export const home = async (ctx: Context) => {
  ctx.body = {message: 'News API is working.'};
};