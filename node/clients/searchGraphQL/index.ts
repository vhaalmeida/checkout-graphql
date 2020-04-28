import { GraphQLServer } from './../graphqlServer';
import {
  InstanceOptions,
  IOContext,
  Serializable,
} from '@vtex/api'

import {
  ProductArgs,
  query as productQuery,
  ProductResponse,
} from './productQuery'

const extensions = {
  persistedQuery: {
    provider: 'vtex.search-graphql@0.x',
    sender: 'vtex.checkout-graphql@0.x',
  },
}

export class SearchGraphQL extends GraphQLServer {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(ctx, opts)
  }

  public product = <T extends Serializable = ProductResponse>(
    variables: ProductArgs,
    query: string = productQuery
  ) =>
    this.query<T>(query, variables, extensions, { metric: 'get-product' })
}
