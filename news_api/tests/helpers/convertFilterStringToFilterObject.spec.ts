import convertFilterStringToFilterObject from '../../src/helpers/convertFilterStringToFilterObject';
import FieldTypes from '../../src/common/enums/FieldTypes';

describe('convertFilterStringToFilterObject', () => {
  const fieldsSpecifications = {
    title: FieldTypes.TEXT,
    created_at: FieldTypes.DATE,
  };

  test('should return an empty filter object for an empty filter string', () => {
    const result = convertFilterStringToFilterObject('', fieldsSpecifications);
    expect(result).toEqual({});
  });

  test('should convert a valid filter string to a filter object for text field', () => {
    const filterStr = '{"title": {"filterPhrase": "example"}}';
    const result = convertFilterStringToFilterObject(filterStr, fieldsSpecifications);
    expect(result).toEqual({
      title: {
        $regex: new RegExp('example', 'i'),
      },
    });
  });

  test('should convert a valid filter string to a filter object for date field', () => {
    const filterStr = '{"created_at": {"minDate": "2024-01-01", "maxDate": "2024-01-31"}}';
    const result = convertFilterStringToFilterObject(filterStr, fieldsSpecifications);
    expect(result).toEqual({
      created_at: {
        $gte: new Date('2024-01-01'),
        $lte: new Date('2024-01-31'),
      },
    });
  });

  test('should throw an error for an invalid filter string', () => {
    const filterStr = '{"invalidField": {"filterPhrase": "example"}}';
    expect(() => convertFilterStringToFilterObject(filterStr, fieldsSpecifications)).toThrowError(
      'filterStr parameter does not match the specification.'
    );
  });

  test('should throw an error for missing filter phrase in text field specification', () => {
    const filterStr = '{"title": {}}';
    expect(() => convertFilterStringToFilterObject(filterStr, fieldsSpecifications)).toThrowError(
      'No filter phrase is specified.'
    );
  });

  test('should throw an error for invalid min date in date field specification', () => {
    const filterStr = '{"created_at": {"minDate": "invalid-date"}}';
    expect(() => convertFilterStringToFilterObject(filterStr, fieldsSpecifications)).toThrowError(
      'Invalid min date.'
    );
  });

  test('should throw an error for invalid format - missing quotes', () => {
    const filterStr = '{created_at: {minDate: invalid-date}}';
    expect(() => convertFilterStringToFilterObject(filterStr, fieldsSpecifications)).toThrowError(
      "Expected property name or '}' in JSON at position 1 (line 1 column 2)"
    );
  });
});
