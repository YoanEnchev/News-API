// Any exception thrown in this method must be handled by it's caller.

import Sorts from "../../../common/enums/Sorts";
import { Sort } from "mongodb";

export default function convertSortStringToSortObject(sortStr: string, allowedFields: string[]): Sort {
    
    const result: Sort = {};
    if (sortStr.length == 0) return result;

    const sortObject: object = JSON.parse(sortStr);
    const sortFields: string[] = Object.keys(JSON.parse(sortStr));

    // Check if the arrays have the same length and contain the same elements
    if (sortFields.some((field: string) => !allowedFields.includes(field))) {
        throw new Error('sortStr parameter does not match allowedFields parameter.');
    }

    // Check if specified sorting is valid and convert to the necessary format.
    Object.entries(sortObject).forEach(([field, sort]) => {
        if (sort !== 'asc' && sort !== 'desc') {
            throw new Error(`Invalid sorting - ${sort} specified`);
        }

        result[field] = sort == 'asc' ? Sorts.ASC : Sorts.DESC;
    });

    return result;
}