const uuid = require('uuid').v4
const Joi = require('@hapi/joi');

const response = require('../util/response');
const decoratorValidator = require('../util/decoratorValidator');
const globalEnum = require('../util/globalEnum');

class Handler {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService;
    this.dynamoScoreTable = process.env.DYNAMO_SCORE_TABLE
    this.dynamoUserTable = process.env.DYNAMO_USER_TABLE
  }

  static validator() {
    return Joi.object({
      score: Joi.number().required()
    })
  }

  prepareData(data) {
    const params = {
      TableName: this.dynamoScoreTable,
      Item: {
        ...data,
        id: uuid(),
        createdAt: new Date().toISOString()
      }
    }
    return params
  }

  async getUser(userId) {
    const params = {
      TableName: this.dynamoUserTable,
      Key: {
        id: userId
      }
    };
  
    return this.dynamoDbService.get(params).promise();
  }

  async insert(data) {
    return this.dynamoDbService.put(data).promise();
  }

  async main(event) {
    if (!event.pathParameters || !event.pathParameters.userId)
      return response.error({ statusCode: 422 }, null, 'userId is required!')
    
    try {

      const user = await this.getUser(event.pathParameters.userId);
      if (!user || !user.Item || !user.Item.id) return response.error({ statusCode: 422 }, null, 'user not found!')


      const data = event.body
      const dbParams = this.prepareData({ ...data, userId: user.Item.id, username: user.Item.username })

      await this.insert(dbParams)
      
      return response.success({ ...dbParams.Item })
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