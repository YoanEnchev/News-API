import Koa from 'koa';
import { config as dotenvConfig } from 'dotenv';
import { home } from './routes/home';
import { listNews } from './routes/news';
import Router from 'koa-router';

dotenvConfig({ path: '../.env' });

const app: Koa = new Koa();
const router = new Router();

app.use(router.routes()).use(router.allowedMethods());

router.get('/', home);
router.get('/news', listNews);


app.listen(process.env.NODE_JS_PORT);