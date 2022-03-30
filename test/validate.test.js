const { validateNameLength, 
        validatePositivePrice,
        validateTags,
        validateProduct
      } = require('../src/validate');

describe('validateNameLength', () => {
  test('function exists', () => {
    expect(validateNameLength).toBeDefined();
  });

  test('returns false for name with more than 40 chraracters', () => {
    const testName = 'thisIsAReallyLongNameToTestLengthValidation';
    const valid = validateNameLength(testName);
    expect(valid).toEqual(false);
  });

  test('returns false for no name', () => {
    const testName = '';
    const valid = validateNameLength(testName);
    expect(valid).toEqual(false);
  });

  test('returns true for name less than 40 characters', () => {
    const testName = 'Product Name';
    const valid = validateNameLength(testName);
    expect(valid).toEqual(true);
  })
});


describe('validatePositivePrice', () => {
  test('it exists', () => {
    expect(validatePositivePrice).toBeDefined();
  })

  test('returns false for negative price', () => {
    const testPrice = -15.00;
    const valid = validatePositivePrice(testPrice);

    expect(valid).toEqual(false);
  });

  test('returns true for positive price', () => {
    const testPrice = 17.50;
    const valid = validatePositivePrice(testPrice);

    expect(valid).toEqual(true);
  });

  test('returns true for prize of 0', () => {
    const testPrice = 0;
    const valid = validatePositivePrice(testPrice);

    expect(valid).toEqual(true);
  })
});


describe('validateTags', () => {
  test('function exists', () => {
    expect(validateTags).toBeDefined();
  });

  test('returns false if tags not in product object', () => {
    const testProduct = {
      id: '1234abcd',
      name: 'Widget',
      price: 20.99,
    };
    valid = validateTags(testProduct);

    expect(valid).toEqual(false);
  });

  test('returns true if tags array has zero or more tags', () => {
    const testProduct1 = {
      id: '1234abcd',
      name: 'Widget',
      price: 20.99,
      tags: []
    };

    const testProduct2 = {
      id: '1234abcd',
      name: 'Widget',
      price: 20.99,
      tags: ['tag1', 'tag2']
    };

    valid1 = validateTags(testProduct1);
    valid2 = validateTags(testProduct2);

    expect(valid1).toEqual(true);
    expect(valid2).toEqual(true);
  });
});


describe('validateProduct', () => {
  test('function is defined', () => {
    expect(validateProduct).toBeDefined();
  });

  test('returns false if name validation fails', () => {
    const testProduct = {
      id: '1234abcd',
      name: 'Widget that is used for lots of things and stuff',
      price: 20.99,
      tags: ['tag1', 'tag2']
    };
    const valid = validateProduct(testProduct);

    expect(valid).toEqual(false);
  });

  test('returns false if price validation fails', () => {
    const testProduct = {
      id: '1234abcd',
      name: 'Widget',
      price: -20.99,
      tags: ['tag1', 'tag2']
    };
    const valid = validateProduct(testProduct);

    expect(valid).toEqual(false);
  });

  test('returns false if tags validation fails', () => {
    const testProduct = {
      id: '1234abcd',
      name: 'Widget',
      price: 20.99,
    };
    const valid = validateProduct(testProduct);

    expect(valid).toEqual(false);
  });

  test('returns true if validation passes', () => {
    const testProduct = {
      id: '1234abcd',
      name: 'Widget',
      price: 20.99,
      tags: ['tag1', 'tag2']
    };
    const valid = validateProduct(testProduct);

    expect(valid).toEqual(true);
  });
});