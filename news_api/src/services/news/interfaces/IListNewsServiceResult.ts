
import { WithId } from "mongodb"
import IServiceOperationResponse from "services/common/interfaces/IServiceOperationResponse"
import NewsInList from "models/news/NewsInList"

interface IListNewsServiceResult extends IServiceOperationResponse {
    news?: WithId<NewsInList>[]
}
  
export default IListNewsServiceResult