import { DocumentNode, print } from 'graphql';
import * as superagent from 'superagent';
import { prettyPrint } from './json';

export type Variable = string | number | boolean | Date | string[];

export type GraphqlRequest<T> = {
  body: {
    data: Record<string, T>;
    errors: Error[];
  };
};

export class ApiRequest<T> {
  protected readonly request: superagent.Request;
  protected operation: DocumentNode;
  protected variables: Record<string, unknown> = {};

  constructor() {
    this.request = superagent
      .post('http://localhost:3002/graphql')
      .set('Accept', 'application/json')
      .timeout(30_000)
      .type('form');
  }

  static builder<T>(): ApiRequest<T> {
    return new ApiRequest<T>();
  }

  build(): ApiRequest<T> {
    return this;
  }

  withClientVersion(version: string): ApiRequest<T> {
    this.request.set('x-client-version', version);
    return this;
  }

  withTimezone(timezone: string): ApiRequest<T> {
    this.request.set('x-timezone', timezone);
    return this;
  }

  withVariables(variables: Record<string, any>): ApiRequest<T> {
    this.variables = variables;
    return this;
  }

  withOperation(operation: DocumentNode): ApiRequest<T> {
    this.operation = operation;
    return this;
  }

  async send(): Promise<GraphqlRequest<T>> {
    const data = {
      variables: JSON.stringify(this.variables),
      query: print(this.operation),
    };

    try {
      const request = await this.request.send(data);

      prettyPrint({ response: request.body });

      return request;
    } catch (e) {
      // TODO check this in case we want to check the errors array?
      console.error(e);
      throw new Error('Use case threw, check the response');
    }
  }
}
