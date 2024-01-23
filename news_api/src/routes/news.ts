import ServiceOperationStatuses from '../services/common/enums/ServiceOperationStatuses';
import NewsService from '../services/news/NewsService';
import ICreateNewsServiceResult from '../services/news/interfaces/ICreateNewsServiceResult';
import IListNewsServiceResult from 'services/news/interfaces/IListNewsServiceResult';
import IUpdateNewsServiceResult from 'services/news/interfaces/IUpdateNewsServiceResult';
import CreateNewsRequest from '../requests/news/CreateNewsRequest';
import UpdateNewsRequest from '../requests/news/UpdateNewsRequest';

export const createNews = async (ctx) => {
  const { title, short_description, text } = ctx.request.body;

  const newsCreationRequest: CreateNewsRequest = Object.assign(new CreateNewsRequest(), {
    title, short_description, text 
  });

  const result: ICreateNewsServiceResult = await NewsService.create(newsCreationRequest);

  if (result.status == ServiceOperationStatuses.SUCCESS) {
    ctx.body = result.insertedId;
    return;
  }

  ctx.status = result.status == ServiceOperationStatuses.ERROR_BAD_REQUEST ? 400 : 503;
  ctx.body = { 'error': result.errorMessage };
};

export const listNews = async (ctx) => {
  const { sorts, filters } = ctx.request.query;

  const result: IListNewsServiceResult = await NewsService.getAll(sorts, filters);

  if (result.status == ServiceOperationStatuses.SUCCESS) {
    ctx.body = result.news;
    return;
  }

  ctx.status = result.status == ServiceOperationStatuses.ERROR_BAD_REQUEST ? 400 : 503;
  ctx.body = { 'error': result.errorMessage };
};

export const updateNews = async (ctx) => {
  const { title, short_description, text } = ctx.request.body;

  const newsUpdateRequest: UpdateNewsRequest = Object.assign(new UpdateNewsRequest(), {
    title, short_description, text 
  });

  const newsId: string = ctx.params.id;
  const result: IUpdateNewsServiceResult = await NewsService.updateOne(newsId, newsUpdateRequest);

  if (result.status == ServiceOperationStatuses.SUCCESS) {
    ctx.body = { 'status': 'success' };
    return;
  }

  ctx.status = result.status == ServiceOperationStatuses.ERROR_BAD_REQUEST ? 400 : 503;
  ctx.body = { 'error': result.errorMessage };
}

export const deleteNews = async (ctx) => {
  const newsId: string = ctx.params.id;
  const result: IUpdateNewsServiceResult = await NewsService.deleteOne(newsId);

  if (result.status == ServiceOperationStatuses.SUCCESS) {
    ctx.body = { 'status': 'success' };
    return;
  }

  ctx.status = result.status == ServiceOperationStatuses.ERROR_BAD_REQUEST ? 400 : 503;
  ctx.body = { 'error': result.errorMessage };
}