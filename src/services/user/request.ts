import { serviceFetch } from '@utils/service';
import { getRoute } from '@utils/route';
import { QueryFunctionContext } from 'react-query';
import { DefaultQueryKey } from '@interfaces/query';
import { UserModel } from '@models/user';

export const DefaultFilterUserQueryKey: [string, string, string] = ['User', 'filter', '/api/users'];

export type FilterUserRequestBody = {
  users?: any;
  pagination_page?: number;
  pagination_limit?: number;
};

export type FilterUserResponseBody = {
  total_pages: number;
  users: UserModel[];
};

export const filterUserApi = async (
  context: QueryFunctionContext<DefaultQueryKey<Partial<FilterUserRequestBody> | undefined>>,
): Promise<FilterUserResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/users', context.queryKey[3]),
    params: context.queryKey[3] || {},
    method: 'GET',
  });
};

export const DefaultShowUserQueryKey: [string, string, string] = ['User', 'show', '/api/users/:id'];

export type ShowUserRequestBody = {
  id: number | string;
};

export type ShowUserResponseBody = {
  user: UserModel;
};

export const showUserApi = async (
  context: QueryFunctionContext<DefaultQueryKey<ShowUserRequestBody | undefined>>,
): Promise<ShowUserResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/users/:id', context.queryKey[3]),
    params: context.queryKey[3] || {},
    method: 'GET',
  });
};

export type CreateUserRequestBody = {
  users?: any;
};

export type CreateUserResponseBody = {
  user: UserModel;
  error_object: any;
};

export const createUserApi = async (
  body: CreateUserRequestBody,
): Promise<CreateUserResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/users', body),
    method: 'POST',
    data: body,
  });
};

export type UpdateUserRequestBody = {
  id: number | string;
  users?: any;
};

export type UpdateUserResponseBody = {
  user: UserModel;
  error_object: any;
};

export const updateUserApi = async (
  body: UpdateUserRequestBody,
): Promise<UpdateUserResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/users/:id', body),
    method: 'PUT',
    data: body,
  });
};

export type DeleteUserRequestBody = {
  id: number | string;
};

export type DeleteUserResponseBody = {};

export const deleteUserApi = async (
  body: DeleteUserRequestBody,
): Promise<DeleteUserResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/users/:id', body),
    method: 'DELETE',
    data: body,
  });
};
