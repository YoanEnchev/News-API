import convertSortStringToSortObject from '../../src/helpers/convertSortStringToSortObject';
import Sorts from '../../src/common/enums/Sorts';

describe('convertSortStringToSortObject', () => {
  const allowedFields = ['title', 'created_at'];

  test('should return an empty sort object for an empty sort string', () => {
    const result = convertSortStringToSortObject('', allowedFields);
    expect(result).toEqual({});
  });

  test('should convert a valid sort string to a sort object for ascending order', () => {
    const sortStr = '{"title": "asc"}';
    const result = convertSortStringToSortObject(sortStr, allowedFields);
    expect(result).toEqual({
      title: Sorts.ASC,
    });
  });

  test('should convert a valid sort string to a sort object for descending order', () => {
    const sortStr = '{"created_at": "desc"}';
    const result = convertSortStringToSortObject(sortStr, allowedFields);
    expect(result).toEqual({
      created_at: Sorts.DESC,
    });
  });

  test('should throw an error for an invalid sort string', () => {
    const sortStr = '{"invalidField": "asc"}';
    expect(() => convertSortStringToSortObject(sortStr, allowedFields)).toThrowError(
      'sortStr parameter does not match allowedFields parameter.'
    );
  });

  test('should throw an error for an invalid sort order', () => {
    const sortStr = '{"title": "invalid-order"}';
    expect(() => convertSortStringToSortObject(sortStr, allowedFields)).toThrowError(
      'Invalid sorting - invalid-order specified'
    );
  });

  test('should throw an error for missing sort order', () => {
    const sortStr = '{"created_at": ""}';
    expect(() => convertSortStringToSortObject(sortStr, allowedFields)).toThrowError(
      'Invalid sorting -  specified'
    );
  });

  test('should throw an error for invalid format - missing quotes', () => {
    const sortStr = '{created_at: "asc"}';
    expect(() => convertSortStringToSortObject(sortStr, allowedFields)).toThrowError(
      "Expected property name or '}' in JSON at position 1 (line 1 column 2)"
    );
  });
});
