import http from "../http-common";

class ModelDataService {
  getAll() {
    return http.get("/model");
  }

  get(id) {
    return http.get(`/model/${id}`);
  }

  create(data) {
    return http.post("/model", data);
  }

  findByTitle(title) {
    return http.get(`/model?title=${title}`);
  }
  
}
export default new ModelDataService();