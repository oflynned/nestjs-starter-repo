import { readFile } from 'fs/promises';
import { DocumentNode, parse } from 'graphql';
import { join } from 'path';

export const getGraphqlFile = async (
  filename: string,
): Promise<DocumentNode> => {
  try {
    const file = await readFile(join(__dirname, '../tests/', filename));

    return parse(file.toString());
  } catch (e) {
    throw e;
  }
};

export const getQuery = async (filename: string): Promise<DocumentNode> => {
  return getGraphqlFile(`queries/${filename}`);
};

export const getMutation = async (filename: string): Promise<DocumentNode> => {
  return getGraphqlFile(`mutations/${filename}`);
};
