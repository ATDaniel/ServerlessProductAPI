function buildFilterExpression(tagArray) {
  let filterExpression = '';

  for (let tag in tagArray) {
    if (tag < tagArray.length - 1) {
      filterExpression += `contains(tags, :tag${parseInt(tag)+1}) AND `
    } else {
      filterExpression += `contains(tags, :tag${parseInt(tag)+1})`
    }
  }

  return filterExpression;
}

function buildExpressionValueObject(tagArray) {
  let expressionAttributeValues = {}
  
  for (let tag in tagArray) {
    expressionAttributeValues[`:tag${parseInt(tag)+1}`] = tagArray[tag];
  }

  return expressionAttributeValues;
}

module.exports = { 
  buildFilterExpression,
  buildExpressionValueObject
}