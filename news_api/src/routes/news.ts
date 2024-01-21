import ServiceOperationStatuses from '../services/common/enums/ServiceOperationStatuses';
import NewsService from '../services/news/NewsService';
import ICreateNewsServiceResult from '../services/news/interfaces/ICreateNewsServiceResult';
import CreateNewsRequest from '../requests/news/CreateNewsRequest';

export const listNews = async (ctx) => {
  ctx.body = [];
};

export const createNews = async (ctx) => {
  const { title, shortDescription, text } = ctx.request.body;

  const newsCreationRequest: CreateNewsRequest = Object.assign(new CreateNewsRequest(), {
    title, shortDescription, text 
  });

  const result: ICreateNewsServiceResult = await NewsService.create(newsCreationRequest);

  if (result.status == ServiceOperationStatuses.SUCCESS) {
    ctx.status = 200;
    ctx.body = result.insertedId;
    return;
  }

  ctx.status = result.status == ServiceOperationStatuses.ERROR_BAD_REQUEST ? 400 : 503;
  ctx.body = { 'error': result.errorMessage };
};