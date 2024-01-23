import { Context, Next } from 'koa';
import RequestsProcessingService from '../services/requestsProcessing/RequestsProcessingService';

const responseTimeMiddleware = async (ctx: Context, next: Next) => {
  
    // Record the start time before handling the request.
  const startTime = Date.now();

  // Execute the next middleware in the stack
  await next();

  RequestsProcessingService.create(startTime, ctx);
};

export default responseTimeMiddleware;
