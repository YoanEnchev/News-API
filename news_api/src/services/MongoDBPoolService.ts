import { Collection, Db, MongoClient } from "mongodb";

interface DatabaseCollections {
    // List all collections here:
    news: Collection|null;
    requestsProcessings: Collection|null;
}

class MongoDBPoolService {

    poolClient: MongoClient|null = null;

    collections: DatabaseCollections = {
        'news': null,
        'requestsProcessings': null
    };

    async connect() {
        const { MONGO_INITDB_DATABASE, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;
        const client: MongoClient = new MongoClient(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`);

        this.poolClient = await client.connect();

        const database: Db = client.db(MONGO_INITDB_DATABASE);

        // Setup collections
        this.setupNewsCollection(database);
        this.setupRequestProcessingsCollection(database);
    }

    getConnectionPool(): MongoClient|null {
        return this.poolClient;
    }

    private async setupNewsCollection(database: Db) {

        const newsCollectionName: string = 'news';
        const newsCollectionExists: boolean = (await database.listCollections({ name: newsCollectionName }).toArray()).length > 0; 

        if (!newsCollectionExists) {
            await database.createCollection(newsCollectionName);

            const collection: Collection = database.collection(newsCollectionName);


            await Promise.all([
                collection.createIndex({ created_at: 1 }), 
                collection.createIndex({ title: 1 })
            ]);

            console.log("News collection and it's indexes created successfully.");
        }
        else {
            console.log("News collection already exists.");
        }

        this.collections.news = database.collection(newsCollectionName);
    }

    private async setupRequestProcessingsCollection(database: Db) {

        const requestsProcessingCollectionName: string = 'requests_processings';
        const requestsProcessingCollectionExists: boolean = (await database.listCollections({ name: requestsProcessingCollectionName }).toArray()).length > 0;

        if (!requestsProcessingCollectionExists) {
            await database.createCollection(requestsProcessingCollectionName);

            console.log('Request processing collection created successfully.');
        }
        else {
            console.log('Request processing collection already exists.');
        }

        this.collections.requestsProcessings = database.collection(requestsProcessingCollectionName);
    }
}

export default new MongoDBPoolService()