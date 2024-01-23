// Any exception thrown in this method must be handled by it's caller.

import FieldTypes from "../common/enums/FieldTypes";
import FieldsSpecifications from "../common/interfaces/FieldsSpecifications";
import { Filter, Document } from "mongodb";

export default function convertFilterStringToFilterObject(filterStr: string, fieldsSpecifications: FieldsSpecifications): Filter<Document> {

    const result: Filter<Document> = {};
    if (filterStr.length == 0) return result;

    const filterObject: object = JSON.parse(filterStr);
    const filterFields: string[] = Object.keys(filterObject);

    const allowedFields = Object.keys(fieldsSpecifications);

    // Check if the arrays have the same length and contain the same elements
    if (filterFields.some((field: string) => !allowedFields.includes(field))) {
        throw new Error('filterStr parameter does not match the specification.');
    }

    // Check if specified sorting is valid and convert to the necessary format.
    Object.entries(filterObject).forEach(([field, data]) => {

        if (fieldsSpecifications[field] == FieldTypes.TEXT) {
            
            const filterPhrase: string = data.filterPhrase;
            if (!filterPhrase) throw new Error('No filter phrase is specified.'); 
            
            
            result[field] = {
                $regex: new RegExp(filterPhrase, 'i')
            };
        }
        else if (fieldsSpecifications[field] == FieldTypes.DATE) {
            
            const {minDate, maxDate} = data;

            const itemToAdd: object = {};

            if (minDate) {
                const dateObj: Date = new Date(minDate);

                if (isNaN(dateObj.getTime())) {
                    throw new Error('Invalid min date.'); 
                }

                itemToAdd['$gte'] = dateObj;
            }

            if (maxDate) {
                const dateObj: Date = new Date(maxDate);

                if (isNaN(dateObj.getTime())) {
                    throw new Error('Invalid min date.'); 
                }

                itemToAdd['$lte'] = dateObj;
            }
            
            result[field] = itemToAdd;
        }
        else {
            throw new Error('Unhandle field specification: ' + fieldsSpecifications[field]); 
        }
    });
    
    return result;
}