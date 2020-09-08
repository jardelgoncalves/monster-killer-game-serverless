const uuid = require('uuid').v4
const response = require('../util/response');

class Handler {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService;
    this.dynamoRankingTable = process.env.DYNAMO_RANKING_TABLE
  }

  treatRecords({ Records }) {
    if(!Records || !Array.isArray(Records)) return [];

    return Records.map(({ dynamodb }) => this.prepareData({
      userId: dynamodb.NewImage.userId.S,
      username: dynamodb.NewImage.username.S,
      score: dynamodb.NewImage.score.N,
    }))
  }

  prepareData(data) {
    const params = {
      TableName: this.dynamoRankingTable,
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
      const data = this.treatRecords(event)

      await Promise.all(
        data.map(d => this.insert(d))
      )
      
      return response.success({ success: true })
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

module.exports = handler.main.bind(handler)
