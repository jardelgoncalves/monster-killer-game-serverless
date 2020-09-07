const uuid = require('uuid').v4
const Joi = require('@hapi/joi');

const response = require('../util/response');
const decoratorValidator = require('../util/decoratorValidator');
const globalEnum = require('../util/globalEnum');

class Handler {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService;
    this.dynamoUserTable = process.env.DYNAMO_USER_TABLE
  }

  static validator() {
    return Joi.object({
      username: Joi.string().min(2).max(100).required()
    })
  }

  prepareData(data) {
    const params = {
      TableName: this.dynamoUserTable,
      Item: {
        ...data,
        id: uuid(),
        createdAt: new Date().toISOString()
      }
    }
    return params
  }

  async insert(data) {
    return this.dynamoDbService.put(data).promise();
  }

  async main(event) {    
    try {
      const data = event.body

      const dbParams = this.prepareData(data)
      await this.insert(dbParams)

      return response.success(dbParams.Item)
    } catch (error) {
      console.error('Deu ruim**', error.stack)
      return response.error({ statusCode: 500 })
    }
  }
}

const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = new Handler({
  dynamoDbService: DynamoDB
});

module.exports = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
)