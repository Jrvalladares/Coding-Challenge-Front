import Api from "./index";
export const AxiosOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },};

export default {
  async fetch(params) {
    return Api.get('/trucks', {params}, AxiosOptions);
  },

  async create(params) {
    return Api.post(`/trucks`, params, AxiosOptions);
  },

  async update(id, params) {
    return Api.put(`/trucks/${id}`, params, AxiosOptions);
  },

  async delete(id) {
    return Api.delete(`/trucks/${id}`, AxiosOptions);
  },
};