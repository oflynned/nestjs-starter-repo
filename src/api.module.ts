import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApiConfigModule } from './core/config/api.config.module';
import { ApiConfigService } from './core/config/api.config.service';
import { AppLoggerMiddleware } from './core/logger/request.logger';
import { getConnectionOptions } from './core/postgres/connection.options';
import { EmailModule } from './domains/email/email.module';
import { UserModule } from './domains/user/user.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule,
    ApiConfigModule,
    GatewayModule,
    UserModule,
    EmailModule,
    MikroOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: async (config: ApiConfigService) => {
        return getConnectionOptions(config.getDatabaseUrl());
      },
    }),
    BullModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: async (config: ApiConfigService) => {
        return {
          redis: config.getRedisConnectionOptions(),
        };
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: async (config: ApiConfigService): Promise<unknown> => {
        const isRelaxedEnv = config.isDevelopmentOrStagingMode();
        return {
          useGlobalPrefix: true,
          path: '/graphql',
          typePaths: [join(__dirname, './assets/schema.graphql')],
          resolvers: {
            DateTime: GraphQLISODateTime,
          },
          debug: isRelaxedEnv,
          playground: isRelaxedEnv,
          introspection: isRelaxedEnv,
        };
      },
    }),
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
