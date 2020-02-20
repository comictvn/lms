import httpClient from 'services/httpClient';
import { stringify } from 'qs';

export async function fetchList(params: any) {
  return await httpClient().get(`/v1/users?${stringify(params)}`);
}
export async function fetchDetail(id: number) {
  return await httpClient().get(`/v1/users/${id}`);
}
export async function deleteUser(id: number) {
  return await httpClient().delete(`/v1/users/${id}`);
}

export async function updateDetail({ id, ...data }: any) {
  return await httpClient().put(`/v1/users/${id}`, data);
}
export async function create(data: any) {
  return await httpClient().post(`/v1/users`, data);
}

export default {
  fetchList,
  fetchDetail,
  deleteUser,
};
