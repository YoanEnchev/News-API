import Koa from 'koa';
import { config as dotenvConfig } from 'dotenv';
import { home } from './routes/home';
import { listNews, createNews } from './routes/news';
import Router from 'koa-router';
import MongoDBPoolService from './services/MongoDBPoolService';
import bodyParser from 'koa-bodyparser';

dotenvConfig({ path: '../.env' });

const app: Koa = new Koa();
const router = new Router();

app.use(bodyParser()); // Read parameter from body request.
app.use(router.routes()).use(router.allowedMethods());

router.get('/', home);
router.get('/news', listNews);
router.post('/news', createNews)

MongoDBPoolService.connect();

app.listen(process.env.NODE_JS_PORT);