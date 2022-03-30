# Serverless Product API

This is a simple API created using AWS serverless technologies. It supports three endpoints- one for creating new products, reading a single product, and searching products by tags.

## Technologies Used:
 - NodeJS 14.x
 - ExpressJS
 - Jest
 - Serverless Framework
 - AWS Lambda
 - AWS DynamoBD
 - AWS API Gateway


<br/>

# Endpoints:
### POST - `"/products"`
Create a new product. A unique ID is generated and used to write the request object to DynamoDB.

Request:

    {
      "name": "Test Product 2",
      "price": 22.50,
      "tags": [
        "tag2",
        "tag3"
      ]
    }

Response:

    {
      "id": "b101140f-ad56-4c81-8713-868e2edf178b",
      "name": "Test Product 2",
      "price": 22.5,
      "tags": [
        "tag2",
        "tag3"
      ]
    }

### GET - `"/products/search?tags=tag1,tag2"`
Retreives all product entries that contain all tags listed in the comma-separated strings in the querystring parameters.

Request URL:
    `"https://deployedAPI/products/search?tags=tag2,tag3"`

Response:

    {
      "_records": [
        {
          "id": "b101140f-ad56-4c81-8713-868e2edf178b",
          "price": 22.5,
          "name": "Test Product 2",
          "tags": [
            "tag2",
            "tag3"
          ]
        },
        {
          "id": "f214a12c-e67c-47e9-a106-c37f2efb6fc3",
          "price": 12.5,
          "name": "Test Product",
          "tags": [
            "tag1",
            "tag2",
            "tag3"
          ]
        }
      ]
    }


### GET - `"/products/:productId"`
Retreives a single product using the Product's ID in the request URL.

Example URL: `"https://deployedAPI.com/products/f214a12c-e67c-47e9-a106-c37f2efb6fc3"`

Response:

    {
      "id": "f214a12c-e67c-47e9-a106-c37f2efb6fc3",
      "name": "Test Product",
      "price": 12.5,
      "tags": [
        "tag1",
        "tag2",
        "tag3"
      ]
    }