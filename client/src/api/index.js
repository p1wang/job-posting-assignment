import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

export const getPosting = (id) => api.get(`/postings/${id}`);
// export const getPostings = () => api.get(`/postings`);
export const createPosting = (newPosting) => api.post(`/postings`, newPosting);
export const deletePosting = (id) => api.delete(`/postings/${id}`);
export const updatePosting = (id, updatedPosting) =>
  api.patch(`/postings/${id}`, updatedPosting);
export const getPostings = (searchQuery) =>
  api.get(`/postings?page=${searchQuery.page}`);
