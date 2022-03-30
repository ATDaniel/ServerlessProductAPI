const { buildFilterExpression, buildExpressionValueObject } = require('../src/dynamoScanBuilder');

describe('buildFilterExpression', () => {
  test('it exists', () => {
    expect(buildFilterExpression).toBeDefined();
  });

  test('it takes an array and returns a string', () => {
    const testTags = ['tag1', 'tag2', 'tag3'];
    const filter = buildFilterExpression(testTags);
    expect(typeof(filter)).toEqual('string');
  });

  test('it returns a filter expression for scan', () => {
    const testTags = ['tag1', 'tag2', 'tag3'];
    const filter = buildFilterExpression(testTags);
    expectedFilter = 'contains(tags, :tag1) AND contains(tags, :tag2) AND contains(tags, :tag3)';

    expect(filter).toEqual(expectedFilter);
  });
});

describe('buildExpressionValueObject', () => {
  test('it exists', () => {
    expect(buildExpressionValueObject).toBeDefined();
  });

  test('it takes in an array of strings and returns an object', () => {
    const testTags = ['tag1', 'tag2', 'tag3'];
    const values = buildExpressionValueObject(testTags);

    expect(typeof(values)).toEqual('object');
  });

  test('it should return an object containing values to be used in the Filter Expression', () => {
    const testTags = ['tag1', 'tag2', 'tag3'];
    const values = buildExpressionValueObject(testTags);
    const expectedValues = {
      ':tag1': 'tag1',
      ':tag2': 'tag2',
      ':tag3': 'tag3'
    }

    expect(values).toEqual(expectedValues);
  });
});