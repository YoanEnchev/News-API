import MongoDBPoolService from "../MongoDBPoolService";
import ICreateNewsServiceResult from "./interfaces/ICreateNewsServiceResult";
import ServiceOperationStatuses from "../common/enums/ServiceOperationStatuses";
import CreateNewsRequest from "requests/news/CreateNewsRequest";
import { validate } from "class-validator";

class NewsService {

    async create(newsRequest: CreateNewsRequest): Promise<ICreateNewsServiceResult> {
        const errors = await validate(newsRequest);

        if (errors.length > 0) {
            return {
                status: ServiceOperationStatuses.ERROR_BAD_REQUEST,
                errorMessage: Object.values(errors[0].constraints)[0]
            };
        }

        try {
            const result = await MongoDBPoolService.collections.news.insertOne(newsRequest);

            return {
                status: ServiceOperationStatuses.SUCCESS,
                insertedId: result.insertedId
            };
        }
        catch(err) {
            // TODO: Use better logging for production.
            console.log(err);

            return {
                status: ServiceOperationStatuses.ERROR_INTERNAL_ERROR, 
                errorMessage: 'Service not available. Please try again later.'
            };
        }
    }

    async getAll() {

    }
}

export default new NewsService()