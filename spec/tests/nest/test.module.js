const { Module } = require('@nestjs/common');
const ExtensionController = require('../../../nest/extension.controller');
const TestController = require('./test.controller');
const { applicationProxyroutes } =  require('../../../nest/api_routes');
@Module({
  imports: [],
  controllers: [ExtensionController, TestController],
})
export class TestModule {
  configure(consumer) {
    consumer
      .apply(applicationProxyroutes)
      .forRoutes('app');
  }
}
