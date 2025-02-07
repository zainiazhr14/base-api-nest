import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Enhancer, GraphQLModule } from '@nestjs/graphql';
import { RootQuery } from './root.query';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          debug: config.get('GRAPHQL_DEBUG') === 'true',
          playground: config.get('GRAPHQL_PLAYGROUND') === 'true',
          autoSchemaFile: join(
            process.cwd(),
            'src/modules/graphql/generated/schema.gql',
          ),
          sortSchema: true,
          fieldResolverEnhancers: ['interceptors'] as Enhancer[],
          autoTransformHttpErrors: true,
          context: (context) => context,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RootQuery],
})
export class GraphqlModule {}
