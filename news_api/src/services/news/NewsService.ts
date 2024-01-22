import MongoDBPoolService from "../MongoDBPoolService";
import ICreateNewsServiceResult from "./interfaces/ICreateNewsServiceResult";
import ServiceOperationStatuses from "../common/enums/ServiceOperationStatuses";
import CreateNewsRequest from "requests/news/CreateNewsRequest";
import { validate } from "class-validator";
import Sorts from "../../common/enums/Sorts";
import { DeleteResult, ObjectId, UpdateResult, WithId } from "mongodb";
import News from "models/news/News";
import NewsInList from "models/news/NewsInList";
import IListNewsServiceResult from "./interfaces/IListNewsServiceResult";
import IUpdateNewsServiceResult from "./interfaces/IUpdateNewsServiceResult";
import UpdateNewsRequest from "requests/news/UpdateNewsRequest";
import FieldTypes from "common/enums/FieldTypes";
import FieldsSpecifications from "common/interfaces/FieldsSpecifications";

class NewsService {

    async create(newsRequest: CreateNewsRequest): Promise<ICreateNewsServiceResult> {
        const errors = await validate(newsRequest);

        if (errors.length > 0) {
            return {
                status: ServiceOperationStatuses.ERROR_BAD_REQUEST,
                errorMessage: Object.values(errors[0].constraints)[0]
            };
        }

        let newsToInsert: News = {
            title: newsRequest.title.trim(),
            short_description: newsRequest.short_description.trim(),
            text: newsRequest.text.trim(),
            created_at: new Date()
        };

        try {
            const result = await MongoDBPoolService.collections.news.insertOne(newsToInsert);

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

    async findOne(newsID: string): Promise<WithId<News>|null> {
        const objectId = new ObjectId(newsID);

        const dbResponse = await MongoDBPoolService.collections.news.findOne({ _id: objectId });
        dbResponse as WithId<Document>|null;

        if (dbResponse == null) return null;

        const news: WithId<News> = {
            _id: dbResponse._id,
            title: dbResponse.title,
            short_description: dbResponse.short_description,
            text: dbResponse.text,
            created_at: dbResponse.created_at
        }

        return news;
    }

    // sorts is string like: {"title:asc,created_at:desc"}
    // filters is like: {"title":"some phrase",created_at:{minDate:'2024-01-22',maxDate:'2024-01-24'}}
    async getAll(sorts: string = '', filters: string = ''): Promise<IListNewsServiceResult> {

        const sortsObject: object = JSON.parse(sorts)
        const filtersObject: object = JSON.parse(filters)
        
        const fieldsSpecifications: FieldsSpecifications = {
            title: FieldTypes.TEXT,
            created_at: FieldTypes.DATE
        }

        try {
            const result: WithId<NewsInList>[] = (await MongoDBPoolService.collections.news
                .find({
                    title: {
                        $regex: new RegExp('nEws', 'i'), // 'i' for case-insensitive search
                    },
                    // created_at: {
                    //     $gte: startDate,  // Date object
                    //     $lte: endDate
                    // },
                })
                .sort({
                    // Notice first filter is primary sort, the next one is secondary and etc...
                    created_at: Sorts.DESC,
                    title: Sorts.ASC
                })
                .toArray())
                .map((item: WithId<News>) => {
                    // Don't show news text content.
                    let newsInList: WithId<NewsInList> = {
                        _id: item._id,
                        title: item.title,
                        short_description: item.short_description,
                        created_at: item.created_at
                    }

                    return newsInList;
                });

            return {
                status: ServiceOperationStatuses.SUCCESS, 
                news: result
            };

        } catch (err) {
            // TODO: Use better logging for production.
            console.log(err);

            return {
                status: ServiceOperationStatuses.ERROR_INTERNAL_ERROR, 
                errorMessage: 'Service not available. Please try again later.'
            };
        }
    }

    async updateOne(id: string, updateNewsRequest: UpdateNewsRequest): Promise<IUpdateNewsServiceResult> {
    
        const errors = await validate(updateNewsRequest);

        if (errors.length > 0) {
            return {
                status: ServiceOperationStatuses.ERROR_BAD_REQUEST,
                errorMessage: Object.values(errors[0].constraints)[0]
            };
        }

        try {
            const result: UpdateResult<Document> = await MongoDBPoolService.collections.news.updateOne({ _id: new ObjectId(id) }, { $set: updateNewsRequest });

            if (result.modifiedCount == 0) {
                return {
                    status: ServiceOperationStatuses.ERROR_BAD_REQUEST,
                    errorMessage: 'News with such ID does not exist.'
                };
            }

            return {
                status: ServiceOperationStatuses.SUCCESS,
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

    async deleteOne(id: string) {
        try {
            const result: DeleteResult = await MongoDBPoolService.collections.news.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount == 0) {
                return {
                    status: ServiceOperationStatuses.ERROR_BAD_REQUEST,
                    errorMessage: 'News with such ID does not exist.'
                };
            }

            return {
                status: ServiceOperationStatuses.SUCCESS,
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
}

export default new NewsService()