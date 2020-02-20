import httpClient from 'services/httpClient';
import { stringify } from 'qs';

export async function fetchList(params: any) {
  return await httpClient().get(`/v1/assignments?${stringify(params)}`);
}
export async function fetchDetail(id: number) {
  return await httpClient().get(`/v1/assignments/${id}`);
}
export async function deleteAssignment(id: number) {
  return await httpClient().delete(`/v1/assignments/${id}`);
}

export async function updateDetail({ id, ...data }: any) {
  return await httpClient().put(`/v1/assignments/${id}`, data);
}
export async function create(data: any) {
  return await httpClient().post(`/v1/assignments`, data);
}

export default {
  fetchList,
  fetchDetail,
  deleteAssignment,
};
