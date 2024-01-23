import Koa from 'koa';
import { config as dotenvConfig } from 'dotenv';
import { home } from './routes/home';
import { listNews, createNews, updateNews, deleteNews } from './routes/news';
import Router from 'koa-router';
import MongoDBPoolService from './services/MongoDBPoolService';
import bodyParser from 'koa-bodyparser';
import responseTimeMiddleware from './middlewares/responseTimeMiddleware';

dotenvConfig({ path: '../.env' });

const app: Koa = new Koa();
const router = new Router();;

app.use(bodyParser()) // Read parameter from body request.
    .use(responseTimeMiddleware)    
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/', home);
router.get('/news', listNews);
router.post('/news', createNews);
router.patch('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

MongoDBPoolService.connect();

app.listen(process.env.NODE_JS_PORT);