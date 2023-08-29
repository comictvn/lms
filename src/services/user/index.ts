import {
  useQuery,
  UseQueryOptions,
  QueryClient,
  useMutation,
  MutateOptions,
  useQueryClient,
} from 'react-query';
import { DefaultQueryKey } from '@interfaces/query';
import { DEFAULT_QUERY_OPTIONS } from '@constants/query';
import {
  FilterUserRequestBody,
  FilterUserResponseBody,
  filterUserApi,
  DefaultFilterUserQueryKey,
  ShowUserRequestBody,
  ShowUserResponseBody,
  showUserApi,
  DefaultShowUserQueryKey,
  CreateUserRequestBody,
  CreateUserResponseBody,
  createUserApi,
  UpdateUserRequestBody,
  UpdateUserResponseBody,
  updateUserApi,
  DeleteUserRequestBody,
  DeleteUserResponseBody,
  deleteUserApi,
} from './request';

export const useFilterUserQuery = (
  params?: Partial<FilterUserRequestBody>,
  options: UseQueryOptions<
    FilterUserResponseBody,
    unknown,
    FilterUserResponseBody,
    DefaultQueryKey<Partial<FilterUserRequestBody> | undefined>
  > = {},
) => {
  return useQuery([...DefaultFilterUserQueryKey, params], filterUserApi, {
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!params,
    ...options,
  });
};

export const fetchFilterUser = async (
  queryClient: QueryClient,
  params?: Partial<FilterUserRequestBody>,
) => {
  return queryClient.fetchQuery({
    queryKey: [...DefaultFilterUserQueryKey, params],
    queryFn: filterUserApi,
  });
};

export const useShowUserQuery = (
  params: ShowUserRequestBody,
  options: UseQueryOptions<
    ShowUserResponseBody,
    unknown,
    ShowUserResponseBody,
    DefaultQueryKey<ShowUserRequestBody | undefined>
  > = {},
) => {
  return useQuery([...DefaultShowUserQueryKey, params], showUserApi, {
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!params,
    ...options,
  });
};

export const fetchShowUser = async (queryClient: QueryClient, params: ShowUserRequestBody) => {
  return queryClient.fetchQuery({
    queryKey: [...DefaultShowUserQueryKey, params],
    queryFn: showUserApi,
  });
};

export const useCreateUserMutation = (
  options: MutateOptions<CreateUserResponseBody, unknown, CreateUserRequestBody, unknown> = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(createUserApi, {
    ...options,
    onSuccess: (data, variables, context) => {
      options.onSuccess && options.onSuccess(data, variables, context);
      queryClient.invalidateQueries('User');
    },
  });
};

export const useUpdateUserMutation = (
  options: MutateOptions<UpdateUserResponseBody, unknown, UpdateUserRequestBody, unknown> = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(updateUserApi, {
    ...options,
    onSuccess: (data, variables, context) => {
      options.onSuccess && options.onSuccess(data, variables, context);
      queryClient.invalidateQueries('User');
    },
  });
};

export const useDeleteUserMutation = (
  options: MutateOptions<DeleteUserResponseBody, unknown, DeleteUserRequestBody, unknown> = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(deleteUserApi, {
    ...options,
    onSuccess: (data, variables, context) => {
      options.onSuccess && options.onSuccess(data, variables, context);
      queryClient.invalidateQueries('User');
    },
  });
};

export * from './request';
