const response = require('../util/response');

class Handler {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService;
    this.dynamoRankingTable = process.env.DYNAMO_RANKING_TABLE
  }

  async main() {
    try {
      const data = await this.dynamoDbService.scan({
        TableName: this.dynamoRankingTable,
        Select: "ALL_ATTRIBUTES"
      }).promise()
      
      return response.success(data.Items, 200)
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
