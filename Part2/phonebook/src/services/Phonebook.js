import axios from "axios";

const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};
const update = (newObject,id) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject);
  return request.then((response) => response.data);
}
const removeAction = (newObject,id) => {
  const request = axios.delete(`${baseUrl}/${id}`,newObject);
  return request.then((response) => response);
}
const phoneService = {
  getAll,
  create,
  update,
  removeAction
}
export default phoneService;
