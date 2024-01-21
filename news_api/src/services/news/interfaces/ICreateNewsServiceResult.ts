import { ObjectId } from "mongodb"
import IServiceOperationResponse from "services/common/interfaces/IServiceOperationResponse"

interface ICreateNewsServiceResult extends IServiceOperationResponse {
    insertedId?: ObjectId
}
  
export default ICreateNewsServiceResult