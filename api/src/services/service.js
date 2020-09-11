const uuid = require('uuid').v4
const response = require('../util/response');


module.exports = class Service {
  constructor({ dynamoDbService, tableName }) {
    this.dynamoDbService = dynamoDbService;
    this.tableName = tableName
  }

  async find({ expression = {}, tableName }) {
    const params = {
      TableName: tableName || this.tableName,
      Key: {
        ...expression
      }
    };
  
    return this.dynamoDbService.get(params).promise();
  }

  async query({ keyExpression = 'id = :id', expressionAttr = {}, tableName }) {
    const params = {
      TableName: tableName || this.tableName,
      KeyConditionExpression: keyExpression,
      ExpressionAttributeValues: expressionAttr
    };

    return this.dynamoDbService.query(params).promise();
  }

  async findAll() {
    try {
      const params = {
        TableName: this.tableName,
        Select: "ALL_ATTRIBUTES"
      };

      const data = await this.dynamoDbService.scan(params).promise()
      return response.success(data.Items, 200)
    } catch (error) {
      console.error(`${this.tableName}:findAll:error: `, error.stack)
      return response.error({ statusCode: 500 }, null, 'Internal error')
    }
  }

  async create(event) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          ...event.body,
          id: uuid(),
          createdAt: new Date().toISOString()
        }
      }

      await this.dynamoDbService.put(params).promise();
      return response.success(params.Item, 201)
    } catch (error) {
      console.error(`${this.tableName}:create:error: `, error.stack)
      return response.error({ statusCode: 500 })
    }
  }

}