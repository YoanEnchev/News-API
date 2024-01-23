import RequestProcessing from "../../models/RequestProcessing";
import MongoDBPoolService from "../../services/MongoDBPoolService";
import { Context } from "vm";

class RequestsProcessingService {
    async create(startTime: number, ctx: Context) {

        const endTime: number = Date.now();

        const requestProcessing: RequestProcessing = {
            started_at: startTime,
            endpoint: ctx.originalUrl.split('?')[0], // Remove query params if such are presented.
            http_method: ctx.method,
            headers: ctx.headers,
            body_parameters: ctx.request.body || {},
            response_status_code: ctx.status,
            response_time_ms: endTime - startTime,
        };

        try {
            await MongoDBPoolService.collections.requestsProcessings.insertOne(requestProcessing);
        }
        catch (err) {
           // TODO: Use better logging for production.
           console.log(err);
        }
    }
}

export default new RequestsProcessingService()