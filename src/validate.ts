function validateNameLength(name: string): boolean {
  if (name.length > 40 || name.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validatePositivePrice(price: number): boolean {
  if (price < 0) {
    return false;
  } else {
    return true;
  }
}

function validateTags(product): boolean {
  if (product.tags === undefined) {
    return false;
  }

  if (product.tags.length >= 0) {
    return true;
  }
  return true;
}

function validateProduct(product): boolean {
  const validName = validateNameLength(product.name);
  const validPrice = validatePositivePrice(product.price);
  const validTags = validateTags(product);

  if (!validName || !validPrice || !validTags) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  validateNameLength,
  validatePositivePrice,
  validateTags,
  validateProduct
};
