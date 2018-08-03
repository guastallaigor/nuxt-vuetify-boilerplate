import Axios from './axios-module'

class TODOService {
  constructor () {
    this._uri = 'https://5afee70fd0cc5b001479bfbc.mockapi.io/todolistcrud'
  }
  get uri () {
    return this._uri
  }
  async getList (params) {
    return Axios.http.get(this.uri, { params })
  }
  async deleteTODO (id) {
    return Axios.http.delete(`${this.uri}/${id}`)
  }
  async editTODO (item) {
    const params = { todo: item.todo }
    return Axios.http.put(`${this.uri}/${item.id}`, params)
  }
  async saveTODO (item) {
    const params = { todo: item.todo }
    return Axios.http.post(`${this.uri}`, params)
  }
}

const service = new TODOService()
export default service
