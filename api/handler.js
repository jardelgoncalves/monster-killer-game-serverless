const AWS = require('aws-sdk');

const ServiceManager = require('./src/services');
const globalEnum = require('./src/util/globalEnum');
const decoratorValidator = require('./src/util/decoratorValidator');
const { userSchema, scoreSchema } = require('./src/schemas');

const DynamoDB = new AWS.DynamoDB.DocumentClient();
const serviceManager = new ServiceManager({ dynamoDbService: DynamoDB })

const { userService, scoreService, rankingService } = serviceManager;

exports.createUser = decoratorValidator(
  userService.create.bind(userService),
  userSchema,
  globalEnum.ARG_TYPE.BODY
);

exports.createScore = decoratorValidator(
  scoreService.create.bind(scoreService),
  scoreSchema,
  globalEnum.ARG_TYPE.BODY
);

exports.rankingGetAll = rankingService.findAll.bind(rankingService)
exports.rankingHandlerEvent = rankingService.treatEvent.bind(rankingService)