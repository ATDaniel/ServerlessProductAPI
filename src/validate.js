function validateNameLength(name) {
  if (name.length > 40 || name.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validatePositivePrice(price) {
  if (price < 0) {
    return false;
  } else {
    return true;
  }
}

function validateTags(product) {
  if (product.tags === undefined) {
    return false;
  }

  if (product.tags.length >= 0) {
    return true;
  }
}

function validateProduct(product) {
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
