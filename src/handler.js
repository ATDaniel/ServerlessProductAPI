const AWS = require('aws-sdk');
const express = require('express');
// const req = require('express/lib/request');
const serverless = require('serverless-http');
const { v4 } = require('uuid');
const { validateProduct } = require('./validate');
const { buildFilterExpression, buildExpressionValueObject } = require('./dynamoScanBuilder');

const app = express();

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.post('/products', async function (req, res) {
  const product = req.body;
  const { name, price, tags } = product;

  const validProduct = validateProduct(product);
  const id = v4();

  if (!validProduct) {
    res.status(400).json({ msg: 'Invalid product object' });
  }

  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      id: id,
      name: product.name,
      price: product.price,
      tags: product.tags
    }
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ id, name, price, tags });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

app.get('/products/search', async function (req, res) {
  const rawTags = req.query.tags;
  const splitTags = rawTags.split(',');
  let queryTags = [];
  
  for (let tag of splitTags) {
    queryTags.push(tag);
  }

  let filterExpression = buildFilterExpression(queryTags);
  let expressionAttributeValues = buildExpressionValueObject(queryTags);

  const params = {
    TableName: PRODUCTS_TABLE,
    FilterExpression: filterExpression,
    ExpressionAttributeValues: expressionAttributeValues
  };

  try {
    const { Items } = await dynamoDbClient.scan(params).promise();
    let results = { '_records': [] };
    console.log(Items);

    if (Items) {
      for (let product of Items) {
        results._records.push(product);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'could not retreive products' });
  }
});

app.get('/products/:productId', async function (req, res) {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      id: req.params.productId
    }
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const product = {
        id: Item.id,
        name: Item.name,
        price: Item.price,
        tags: Item.tags
      }

      res.status(200).json(product); 
    } else {
      res
        .status(404)
        .json({ error: `Could not find product with provided productId: '${req.params.productId}'` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retreive product' });
  }
});



app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found'
  });
});

// module.exports.handler = serverless(app);
module.exports = {
  app: app,
  handler: serverless(app)
}
