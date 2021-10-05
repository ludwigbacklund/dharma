import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: string;
};

/** A connection to a list of `Company` values. */
export type CompaniesConnection = {
  __typename?: 'CompaniesConnection';
  /** A list of edges which contains the `Company` and cursor to aid in pagination. */
  edges: Array<CompaniesEdge>;
  /** A list of `Company` objects. */
  nodes: Array<Maybe<Company>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Company` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Company` edge in the connection. */
export type CompaniesEdge = {
  __typename?: 'CompaniesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Company` at the end of the edge. */
  node?: Maybe<Company>;
};

/** Methods to use when ordering `Company`. */
export enum CompaniesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Company = Node & {
  __typename?: 'Company';
  /** Reads and enables pagination through a set of `Dish`. */
  dishes: DishesConnection;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Order`. */
  orders: OrdersConnection;
  /** Reads and enables pagination through a set of `User`. */
  users: UsersConnection;
};


export type CompanyDishesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DishCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DishesOrderBy>>;
};


export type CompanyOrdersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};


export type CompanyUsersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** A condition to be used against `Company` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CompanyCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `Company` */
export type CompanyInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** Represents an update to a `Company`. Fields that are set will be updated. */
export type CompanyPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** All input for the create `Company` mutation. */
export type CreateCompanyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Company` to be created by this mutation. */
  company: CompanyInput;
};

/** The output of our create `Company` mutation. */
export type CreateCompanyPayload = {
  __typename?: 'CreateCompanyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Company` that was created by this mutation. */
  company?: Maybe<Company>;
  /** An edge for our `Company`. May be used by Relay 1. */
  companyEdge?: Maybe<CompaniesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Company` mutation. */
export type CreateCompanyPayloadCompanyEdgeArgs = {
  orderBy?: Maybe<Array<CompaniesOrderBy>>;
};

/** All input for the create `Dish` mutation. */
export type CreateDishInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Dish` to be created by this mutation. */
  dish: DishInput;
};

/** The output of our create `Dish` mutation. */
export type CreateDishPayload = {
  __typename?: 'CreateDishPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `Dish`. */
  company?: Maybe<Company>;
  /** The `Dish` that was created by this mutation. */
  dish?: Maybe<Dish>;
  /** An edge for our `Dish`. May be used by Relay 1. */
  dishEdge?: Maybe<DishesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Dish` mutation. */
export type CreateDishPayloadDishEdgeArgs = {
  orderBy?: Maybe<Array<DishesOrderBy>>;
};

/** All input for the create `Order` mutation. */
export type CreateOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Order` to be created by this mutation. */
  order: OrderInput;
};

/** The output of our create `Order` mutation. */
export type CreateOrderPayload = {
  __typename?: 'CreateOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Dish` that is related to this `Order`. */
  dish?: Maybe<Dish>;
  /** The `Order` that was created by this mutation. */
  order?: Maybe<Order>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Order`. */
  user?: Maybe<User>;
};


/** The output of our create `Order` mutation. */
export type CreateOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `User`. */
  company?: Maybe<Company>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteCompanyByNodeId` mutation. */
export type DeleteCompanyByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Company` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCompany` mutation. */
export type DeleteCompanyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Company` mutation. */
export type DeleteCompanyPayload = {
  __typename?: 'DeleteCompanyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Company` that was deleted by this mutation. */
  company?: Maybe<Company>;
  /** An edge for our `Company`. May be used by Relay 1. */
  companyEdge?: Maybe<CompaniesEdge>;
  deletedCompanyNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Company` mutation. */
export type DeleteCompanyPayloadCompanyEdgeArgs = {
  orderBy?: Maybe<Array<CompaniesOrderBy>>;
};

/** All input for the `deleteDishByNodeId` mutation. */
export type DeleteDishByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Dish` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDish` mutation. */
export type DeleteDishInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Dish` mutation. */
export type DeleteDishPayload = {
  __typename?: 'DeleteDishPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `Dish`. */
  company?: Maybe<Company>;
  deletedDishNodeId?: Maybe<Scalars['ID']>;
  /** The `Dish` that was deleted by this mutation. */
  dish?: Maybe<Dish>;
  /** An edge for our `Dish`. May be used by Relay 1. */
  dishEdge?: Maybe<DishesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Dish` mutation. */
export type DeleteDishPayloadDishEdgeArgs = {
  orderBy?: Maybe<Array<DishesOrderBy>>;
};

/** All input for the `deleteOrderByNodeId` mutation. */
export type DeleteOrderByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Order` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOrder` mutation. */
export type DeleteOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  dishId: Scalars['Int'];
  userId: Scalars['Int'];
};

/** The output of our delete `Order` mutation. */
export type DeleteOrderPayload = {
  __typename?: 'DeleteOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrderNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Dish` that is related to this `Order`. */
  dish?: Maybe<Dish>;
  /** The `Order` that was deleted by this mutation. */
  order?: Maybe<Order>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Order`. */
  user?: Maybe<User>;
};


/** The output of our delete `Order` mutation. */
export type DeleteOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `User`. */
  company?: Maybe<Company>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

export type Dish = Node & {
  __typename?: 'Dish';
  /** Reads a single `Company` that is related to this `Dish`. */
  company?: Maybe<Company>;
  companyId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Order`. */
  orders: OrdersConnection;
  priceInSek: Scalars['Int'];
};


export type DishOrdersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrderCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};

/** A condition to be used against `Dish` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DishCondition = {
  /** Checks for equality with the object’s `companyId` field. */
  companyId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `Dish` */
export type DishInput = {
  companyId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  priceInSek: Scalars['Int'];
};

/** Represents an update to a `Dish`. Fields that are set will be updated. */
export type DishPatch = {
  companyId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priceInSek?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Dish` values. */
export type DishesConnection = {
  __typename?: 'DishesConnection';
  /** A list of edges which contains the `Dish` and cursor to aid in pagination. */
  edges: Array<DishesEdge>;
  /** A list of `Dish` objects. */
  nodes: Array<Maybe<Dish>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Dish` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Dish` edge in the connection. */
export type DishesEdge = {
  __typename?: 'DishesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Dish` at the end of the edge. */
  node?: Maybe<Dish>;
};

/** Methods to use when ordering `Dish`. */
export enum DishesOrderBy {
  CompanyIdAsc = 'COMPANY_ID_ASC',
  CompanyIdDesc = 'COMPANY_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Company`. */
  createCompany?: Maybe<CreateCompanyPayload>;
  /** Creates a single `Dish`. */
  createDish?: Maybe<CreateDishPayload>;
  /** Creates a single `Order`. */
  createOrder?: Maybe<CreateOrderPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Deletes a single `Company` using a unique key. */
  deleteCompany?: Maybe<DeleteCompanyPayload>;
  /** Deletes a single `Company` using its globally unique id. */
  deleteCompanyByNodeId?: Maybe<DeleteCompanyPayload>;
  /** Deletes a single `Dish` using a unique key. */
  deleteDish?: Maybe<DeleteDishPayload>;
  /** Deletes a single `Dish` using its globally unique id. */
  deleteDishByNodeId?: Maybe<DeleteDishPayload>;
  /** Deletes a single `Order` using a unique key. */
  deleteOrder?: Maybe<DeleteOrderPayload>;
  /** Deletes a single `Order` using its globally unique id. */
  deleteOrderByNodeId?: Maybe<DeleteOrderPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Updates a single `Company` using a unique key and a patch. */
  updateCompany?: Maybe<UpdateCompanyPayload>;
  /** Updates a single `Company` using its globally unique id and a patch. */
  updateCompanyByNodeId?: Maybe<UpdateCompanyPayload>;
  /** Updates a single `Dish` using a unique key and a patch. */
  updateDish?: Maybe<UpdateDishPayload>;
  /** Updates a single `Dish` using its globally unique id and a patch. */
  updateDishByNodeId?: Maybe<UpdateDishPayload>;
  /** Updates a single `Order` using a unique key and a patch. */
  updateOrder?: Maybe<UpdateOrderPayload>;
  /** Updates a single `Order` using its globally unique id and a patch. */
  updateOrderByNodeId?: Maybe<UpdateOrderPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompanyArgs = {
  input: DeleteCompanyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompanyByNodeIdArgs = {
  input: DeleteCompanyByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDishByNodeIdArgs = {
  input: DeleteDishByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrderArgs = {
  input: DeleteOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrderByNodeIdArgs = {
  input: DeleteOrderByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompanyByNodeIdArgs = {
  input: UpdateCompanyByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDishArgs = {
  input: UpdateDishInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDishByNodeIdArgs = {
  input: UpdateDishByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrderByNodeIdArgs = {
  input: UpdateOrderByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type Order = Node & {
  __typename?: 'Order';
  createdAt: Scalars['Datetime'];
  /** Reads a single `Dish` that is related to this `Order`. */
  dish?: Maybe<Dish>;
  dishId: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `User` that is related to this `Order`. */
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

/** A condition to be used against `Order` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type OrderCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `dishId` field. */
  dishId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `Order` */
export type OrderInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  dishId: Scalars['Int'];
  userId: Scalars['Int'];
};

/** Represents an update to a `Order`. Fields that are set will be updated. */
export type OrderPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  dishId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Order` values. */
export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  /** A list of edges which contains the `Order` and cursor to aid in pagination. */
  edges: Array<OrdersEdge>;
  /** A list of `Order` objects. */
  nodes: Array<Maybe<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Order` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Order` edge in the connection. */
export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Order` at the end of the edge. */
  node?: Maybe<Order>;
};

/** Methods to use when ordering `Order`. */
export enum OrdersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DishIdAsc = 'DISH_ID_ASC',
  DishIdDesc = 'DISH_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Company`. */
  companies?: Maybe<CompaniesConnection>;
  company?: Maybe<Company>;
  /** Reads a single `Company` using its globally unique `ID`. */
  companyByNodeId?: Maybe<Company>;
  dish?: Maybe<Dish>;
  /** Reads a single `Dish` using its globally unique `ID`. */
  dishByNodeId?: Maybe<Dish>;
  /** Reads and enables pagination through a set of `Dish`. */
  dishes?: Maybe<DishesConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  order?: Maybe<Order>;
  /** Reads a single `Order` using its globally unique `ID`. */
  orderByNodeId?: Maybe<Order>;
  /** Reads and enables pagination through a set of `Order`. */
  orders?: Maybe<OrdersConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  user?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompaniesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CompanyCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompaniesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompanyArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompanyByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDishArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDishByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDishesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<DishCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DishesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrderArgs = {
  createdAt: Scalars['Datetime'];
  dishId: Scalars['Int'];
  userId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrderByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrdersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrderCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateCompanyByNodeId` mutation. */
export type UpdateCompanyByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Company` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Company` being updated. */
  patch: CompanyPatch;
};

/** All input for the `updateCompany` mutation. */
export type UpdateCompanyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Company` being updated. */
  patch: CompanyPatch;
};

/** The output of our update `Company` mutation. */
export type UpdateCompanyPayload = {
  __typename?: 'UpdateCompanyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Company` that was updated by this mutation. */
  company?: Maybe<Company>;
  /** An edge for our `Company`. May be used by Relay 1. */
  companyEdge?: Maybe<CompaniesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Company` mutation. */
export type UpdateCompanyPayloadCompanyEdgeArgs = {
  orderBy?: Maybe<Array<CompaniesOrderBy>>;
};

/** All input for the `updateDishByNodeId` mutation. */
export type UpdateDishByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Dish` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Dish` being updated. */
  patch: DishPatch;
};

/** All input for the `updateDish` mutation. */
export type UpdateDishInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Dish` being updated. */
  patch: DishPatch;
};

/** The output of our update `Dish` mutation. */
export type UpdateDishPayload = {
  __typename?: 'UpdateDishPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `Dish`. */
  company?: Maybe<Company>;
  /** The `Dish` that was updated by this mutation. */
  dish?: Maybe<Dish>;
  /** An edge for our `Dish`. May be used by Relay 1. */
  dishEdge?: Maybe<DishesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Dish` mutation. */
export type UpdateDishPayloadDishEdgeArgs = {
  orderBy?: Maybe<Array<DishesOrderBy>>;
};

/** All input for the `updateOrderByNodeId` mutation. */
export type UpdateOrderByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Order` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Order` being updated. */
  patch: OrderPatch;
};

/** All input for the `updateOrder` mutation. */
export type UpdateOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  dishId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Order` being updated. */
  patch: OrderPatch;
  userId: Scalars['Int'];
};

/** The output of our update `Order` mutation. */
export type UpdateOrderPayload = {
  __typename?: 'UpdateOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Dish` that is related to this `Order`. */
  dish?: Maybe<Dish>;
  /** The `Order` that was updated by this mutation. */
  order?: Maybe<Order>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Order`. */
  user?: Maybe<User>;
};


/** The output of our update `Order` mutation. */
export type UpdateOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Company` that is related to this `User`. */
  company?: Maybe<Company>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  /** Reads a single `Company` that is related to this `User`. */
  company?: Maybe<Company>;
  companyId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Order`. */
  orders: OrdersConnection;
};


export type UserOrdersArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrderCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrdersOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `companyId` field. */
  companyId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  companyId: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  companyId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  CompanyIdAsc = 'COMPANY_ID_ASC',
  CompanyIdDesc = 'COMPANY_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type HeaderQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HeaderQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, company?: { __typename?: 'Company', id: number, name: string } | null | undefined } | null | undefined, users?: { __typename?: 'UsersConnection', nodes: Array<{ __typename?: 'User', id: number, name: string } | null | undefined> } | null | undefined };

export type OrderPreviewFragment = { __typename?: 'Order', dishId: number, userId: number, createdAt: string, dish?: { __typename?: 'Dish', id: number, name: string, imageUrl?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined };

export type UserOrdersQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserOrdersQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, orders: { __typename?: 'OrdersConnection', nodes: Array<{ __typename?: 'Order', dishId: number, userId: number, createdAt: string, dish?: { __typename?: 'Dish', id: number, name: string, imageUrl?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined } | null | undefined> } } | null | undefined };

export type CompanyOrdersQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type CompanyOrdersQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, company?: { __typename?: 'Company', id: number, orders: { __typename?: 'OrdersConnection', nodes: Array<{ __typename?: 'Order', dishId: number, userId: number, createdAt: string, dish?: { __typename?: 'Dish', id: number, name: string, imageUrl?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined };

export type AddDishMutationVariables = Exact<{
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  priceInSek: Scalars['Int'];
}>;


export type AddDishMutation = { __typename?: 'Mutation', createDish?: { __typename?: 'CreateDishPayload', company?: { __typename?: 'Company', id: number, dishes: { __typename?: 'DishesConnection', nodes: Array<{ __typename?: 'Dish', id: number, name: string, imageUrl?: string | null | undefined, description?: string | null | undefined, priceInSek: number } | null | undefined> } } | null | undefined } | null | undefined };

export type DishQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DishQuery = { __typename?: 'Query', dish?: { __typename?: 'Dish', id: number, name: string, description?: string | null | undefined, imageUrl?: string | null | undefined, priceInSek: number } | null | undefined };

export type EditDishMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  priceInSek: Scalars['Int'];
}>;


export type EditDishMutation = { __typename?: 'Mutation', updateDish?: { __typename?: 'UpdateDishPayload', query?: { __typename?: 'Query', dish?: { __typename?: 'Dish', id: number, name: string, description?: string | null | undefined, imageUrl?: string | null | undefined, priceInSek: number } | null | undefined } | null | undefined } | null | undefined };

export type DeleteDishMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDishMutation = { __typename?: 'Mutation', deleteDish?: { __typename?: 'DeleteDishPayload', clientMutationId?: string | null | undefined } | null | undefined };

export type HomeQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type HomeQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, company?: { __typename?: 'Company', id: number, name: string, dishes: { __typename?: 'DishesConnection', nodes: Array<{ __typename?: 'Dish', id: number, name: string, imageUrl?: string | null | undefined, description?: string | null | undefined, priceInSek: number } | null | undefined> } } | null | undefined } | null | undefined };

export type OrderDishMutationVariables = Exact<{
  userId: Scalars['Int'];
  dishId: Scalars['Int'];
}>;


export type OrderDishMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'CreateOrderPayload', user?: { __typename?: 'User', id: number, orders: { __typename?: 'OrdersConnection', nodes: Array<{ __typename?: 'Order', dishId: number, userId: number } | null | undefined> }, company?: { __typename?: 'Company', id: number, orders: { __typename?: 'OrdersConnection', nodes: Array<{ __typename?: 'Order', dishId: number, userId: number } | null | undefined> } } | null | undefined } | null | undefined } | null | undefined };

export const OrderPreviewFragmentDoc = gql`
    fragment OrderPreview on Order {
  dishId
  userId
  createdAt
  dish {
    id
    name
    imageUrl
  }
  user {
    id
    name
  }
}
    `;
export const HeaderDocument = gql`
    query Header($id: Int!) {
  user(id: $id) {
    id
    name
    company {
      id
      name
    }
  }
  users {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useHeaderQuery__
 *
 * To run a query within a React component, call `useHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHeaderQuery(baseOptions: Apollo.QueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
      }
export function useHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
        }
export type HeaderQueryHookResult = ReturnType<typeof useHeaderQuery>;
export type HeaderLazyQueryHookResult = ReturnType<typeof useHeaderLazyQuery>;
export type HeaderQueryResult = Apollo.QueryResult<HeaderQuery, HeaderQueryVariables>;
export const UserOrdersDocument = gql`
    query UserOrders($userId: Int!) {
  user(id: $userId) {
    id
    orders(orderBy: CREATED_AT_DESC, first: 10) {
      nodes {
        ...OrderPreview
      }
    }
  }
}
    ${OrderPreviewFragmentDoc}`;

/**
 * __useUserOrdersQuery__
 *
 * To run a query within a React component, call `useUserOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserOrdersQuery(baseOptions: Apollo.QueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, options);
      }
export function useUserOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, options);
        }
export type UserOrdersQueryHookResult = ReturnType<typeof useUserOrdersQuery>;
export type UserOrdersLazyQueryHookResult = ReturnType<typeof useUserOrdersLazyQuery>;
export type UserOrdersQueryResult = Apollo.QueryResult<UserOrdersQuery, UserOrdersQueryVariables>;
export const CompanyOrdersDocument = gql`
    query CompanyOrders($userId: Int!) {
  user(id: $userId) {
    id
    company {
      id
      orders(orderBy: CREATED_AT_DESC, first: 10) {
        nodes {
          ...OrderPreview
        }
      }
    }
  }
}
    ${OrderPreviewFragmentDoc}`;

/**
 * __useCompanyOrdersQuery__
 *
 * To run a query within a React component, call `useCompanyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCompanyOrdersQuery(baseOptions: Apollo.QueryHookOptions<CompanyOrdersQuery, CompanyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyOrdersQuery, CompanyOrdersQueryVariables>(CompanyOrdersDocument, options);
      }
export function useCompanyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyOrdersQuery, CompanyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyOrdersQuery, CompanyOrdersQueryVariables>(CompanyOrdersDocument, options);
        }
export type CompanyOrdersQueryHookResult = ReturnType<typeof useCompanyOrdersQuery>;
export type CompanyOrdersLazyQueryHookResult = ReturnType<typeof useCompanyOrdersLazyQuery>;
export type CompanyOrdersQueryResult = Apollo.QueryResult<CompanyOrdersQuery, CompanyOrdersQueryVariables>;
export const AddDishDocument = gql`
    mutation AddDish($name: String!, $description: String, $imageUrl: String, $priceInSek: Int!) {
  createDish(
    input: {dish: {name: $name, description: $description, imageUrl: $imageUrl, companyId: 1, priceInSek: $priceInSek}}
  ) {
    company {
      id
      dishes {
        nodes {
          id
          name
          imageUrl
          description
          priceInSek
        }
      }
    }
  }
}
    `;
export type AddDishMutationFn = Apollo.MutationFunction<AddDishMutation, AddDishMutationVariables>;

/**
 * __useAddDishMutation__
 *
 * To run a mutation, you first call `useAddDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDishMutation, { data, loading, error }] = useAddDishMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      imageUrl: // value for 'imageUrl'
 *      priceInSek: // value for 'priceInSek'
 *   },
 * });
 */
export function useAddDishMutation(baseOptions?: Apollo.MutationHookOptions<AddDishMutation, AddDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDishMutation, AddDishMutationVariables>(AddDishDocument, options);
      }
export type AddDishMutationHookResult = ReturnType<typeof useAddDishMutation>;
export type AddDishMutationResult = Apollo.MutationResult<AddDishMutation>;
export type AddDishMutationOptions = Apollo.BaseMutationOptions<AddDishMutation, AddDishMutationVariables>;
export const DishDocument = gql`
    query Dish($id: Int!) {
  dish(id: $id) {
    id
    name
    description
    imageUrl
    priceInSek
  }
}
    `;

/**
 * __useDishQuery__
 *
 * To run a query within a React component, call `useDishQuery` and pass it any options that fit your needs.
 * When your component renders, `useDishQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDishQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDishQuery(baseOptions: Apollo.QueryHookOptions<DishQuery, DishQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DishQuery, DishQueryVariables>(DishDocument, options);
      }
export function useDishLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DishQuery, DishQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DishQuery, DishQueryVariables>(DishDocument, options);
        }
export type DishQueryHookResult = ReturnType<typeof useDishQuery>;
export type DishLazyQueryHookResult = ReturnType<typeof useDishLazyQuery>;
export type DishQueryResult = Apollo.QueryResult<DishQuery, DishQueryVariables>;
export const EditDishDocument = gql`
    mutation EditDish($id: Int!, $name: String!, $description: String, $imageUrl: String, $priceInSek: Int!) {
  updateDish(
    input: {id: $id, patch: {name: $name, description: $description, imageUrl: $imageUrl, priceInSek: $priceInSek}}
  ) {
    query {
      dish(id: $id) {
        id
        name
        description
        imageUrl
        priceInSek
      }
    }
  }
}
    `;
export type EditDishMutationFn = Apollo.MutationFunction<EditDishMutation, EditDishMutationVariables>;

/**
 * __useEditDishMutation__
 *
 * To run a mutation, you first call `useEditDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDishMutation, { data, loading, error }] = useEditDishMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      imageUrl: // value for 'imageUrl'
 *      priceInSek: // value for 'priceInSek'
 *   },
 * });
 */
export function useEditDishMutation(baseOptions?: Apollo.MutationHookOptions<EditDishMutation, EditDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditDishMutation, EditDishMutationVariables>(EditDishDocument, options);
      }
export type EditDishMutationHookResult = ReturnType<typeof useEditDishMutation>;
export type EditDishMutationResult = Apollo.MutationResult<EditDishMutation>;
export type EditDishMutationOptions = Apollo.BaseMutationOptions<EditDishMutation, EditDishMutationVariables>;
export const DeleteDishDocument = gql`
    mutation DeleteDish($id: Int!) {
  deleteDish(input: {id: $id}) {
    clientMutationId
  }
}
    `;
export type DeleteDishMutationFn = Apollo.MutationFunction<DeleteDishMutation, DeleteDishMutationVariables>;

/**
 * __useDeleteDishMutation__
 *
 * To run a mutation, you first call `useDeleteDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDishMutation, { data, loading, error }] = useDeleteDishMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDishMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDishMutation, DeleteDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDishMutation, DeleteDishMutationVariables>(DeleteDishDocument, options);
      }
export type DeleteDishMutationHookResult = ReturnType<typeof useDeleteDishMutation>;
export type DeleteDishMutationResult = Apollo.MutationResult<DeleteDishMutation>;
export type DeleteDishMutationOptions = Apollo.BaseMutationOptions<DeleteDishMutation, DeleteDishMutationVariables>;
export const HomeDocument = gql`
    query Home($userId: Int!) {
  user(id: $userId) {
    id
    name
    company {
      id
      name
      dishes {
        nodes {
          id
          name
          imageUrl
          description
          priceInSek
        }
      }
    }
  }
}
    `;

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHomeQuery(baseOptions: Apollo.QueryHookOptions<HomeQuery, HomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
      }
export function useHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
        }
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeQueryResult = Apollo.QueryResult<HomeQuery, HomeQueryVariables>;
export const OrderDishDocument = gql`
    mutation OrderDish($userId: Int!, $dishId: Int!) {
  createOrder(input: {order: {userId: $userId, dishId: $dishId}}) {
    user {
      id
      orders(orderBy: CREATED_AT_DESC, first: 10) {
        nodes {
          dishId
          userId
        }
      }
      company {
        id
        orders(orderBy: CREATED_AT_DESC, first: 10) {
          nodes {
            dishId
            userId
          }
        }
      }
    }
  }
}
    `;
export type OrderDishMutationFn = Apollo.MutationFunction<OrderDishMutation, OrderDishMutationVariables>;

/**
 * __useOrderDishMutation__
 *
 * To run a mutation, you first call `useOrderDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderDishMutation, { data, loading, error }] = useOrderDishMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      dishId: // value for 'dishId'
 *   },
 * });
 */
export function useOrderDishMutation(baseOptions?: Apollo.MutationHookOptions<OrderDishMutation, OrderDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderDishMutation, OrderDishMutationVariables>(OrderDishDocument, options);
      }
export type OrderDishMutationHookResult = ReturnType<typeof useOrderDishMutation>;
export type OrderDishMutationResult = Apollo.MutationResult<OrderDishMutation>;
export type OrderDishMutationOptions = Apollo.BaseMutationOptions<OrderDishMutation, OrderDishMutationVariables>;