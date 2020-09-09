const uuid = require('uuid').v4
const response = require('../util/response');

class Handler {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService;
    this.dynamoRankingTable = process.env.DYNAMO_RANKING_TABLE
  }

  treatRecords({ Records }) {
    if(!Records || !Array.isArray(Records)) return [];

    return Records.map(({ dynamodb }) => ({
      userId: dynamodb.NewImage.userId.S,
      username: dynamodb.NewImage.username.S,
      scoreId: dynamodb.NewImage.id.S,
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

  async find(data) {
    const params = {
      TableName: this.dynamoRankingTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ':userId': data.userId || null
      }
    }
    return this.dynamoDbService.query(params).promise();
  }

  async createOrUpdate(data) {
    if (!data) return null;

    const record = await this.find(data);
    const exists = record.Items.filter(
      r => r.userId === data.userId && Number(r.score) < Number(data.score)
    )
    if (record.Items.length && !exists.length ) return;
    
    const dbParam =  this.prepareData(data)
    return this.insert(dbParam)
  }

  async main(event) {
    try {
      const data = this.treatRecords(event)

      await Promise.all(
        data.map(d => this.createOrUpdate(d))
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
