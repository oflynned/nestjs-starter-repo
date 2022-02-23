import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { writeFileSync } from 'fs';
import { print } from 'graphql';
import { join } from 'path';

(async () => {
  try {
    const typesArray = await loadFiles([
      join(__dirname, '../gateway/graphql/**/*.graphql'),
    ]);
    const typeDefs = mergeTypeDefs(typesArray);
    const printedTypeDefs = print(typeDefs);

    writeFileSync(join(__dirname, '../assets/schema.graphql'), printedTypeDefs);
  } catch (e) {
    console.log(e);
  }
})();
