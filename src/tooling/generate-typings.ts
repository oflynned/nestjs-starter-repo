import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

(async () => {
  const definitionsFactory = new GraphQLDefinitionsFactory();

  try {
    await definitionsFactory.generate({
      emitTypenameField: true,
      typePaths: [join(process.cwd(), './src/gateway/graphql/**/*.graphql')],
      path: join(process.cwd(), './src/core/types/graphql.ts'),
      outputAs: 'interface',
      customScalarTypeMapping: {
        DateTime: 'Date',
      },
    });
  } catch (e) {
    console.error(e);
  }
})();
