const RankingService = require('./ranking');
const ScoreService = require('./score');
const UserService = require('./user');


module.exports = class ServiceManager {
  constructor({ dynamoDbService }) {
    this.dynamoDbService = dynamoDbService
  };


  get rankingService() {
    return new RankingService({ dynamoDbService: this.dynamoDbService })
  }

  get userService() {
    return new UserService({ dynamoDbService: this.dynamoDbService })
  }

  get scoreService() {
    return new ScoreService({ dynamoDbService: this.dynamoDbService })
  }
}