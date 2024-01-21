import { Collection, Db, MongoClient } from "mongodb";

const newsCollectionName: string = 'news';

interface DatabaseCollections {
    // List all collections here:
    news: Collection|null;
}

class MongoDBPoolService {

    poolClient: MongoClient|null = null;

    collections: DatabaseCollections = {
        'news': null
    };

    async connect() {
        const client: MongoClient = new MongoClient(`mongodb://news_user:123456@host.docker.internal:27017`);

        this.poolClient = await client.connect();

        const database: Db = client.db(process.env.MONGO_INITDB_DATABASE);
        const newsCollectionExists: boolean = (await database.listCollections({ name: newsCollectionName }).toArray()).length > 0;
 

        // Setup collections
        if (!newsCollectionExists) {
            await database.createCollection(newsCollectionName);

            const collection: Collection = database.collection(newsCollectionName);

            await collection.createIndex({ created_at: 1 });
            await collection.createIndex({ title: 1 });

            console.log('Indexes created successfully');
        }
        else {
            console.log('Already exists xx');
        }

        this.collections.news = database.collection(newsCollectionName);
    }

    getConnectionPool(): MongoClient|null {
        return this.poolClient;
    }
}

export default new MongoDBPoolService()