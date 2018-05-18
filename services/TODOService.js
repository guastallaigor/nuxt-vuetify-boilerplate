import axios from 'axios'

// const sleep = () => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

class TODOService {
  constructor () {
    this._uri = 'https://5afee70fd0cc5b001479bfbc.mockapi.io/todolistcrud'
  }
  get uri () {
    return this._uri
  }
  async getList () {
    // await sleep(5000)
    return axios.get(this.uri)
  }
  async deleteTODO (id) {
    console.log(id, ':delete')
    return axios.delete(`${this.uri}/${id}`)
  }
  async editTODO (item) {
    console.log(item, ':edit')
    const params = { todo: item.todo }
    return axios.put(`${this.uri}/${item.id}`, params)
  }
  async saveTODO (item) {
    console.log(item, ':save')
    const params = { todo: item.todo }
    return axios.post(`${this.uri}`, params)
  }
}

const service = new TODOService()
export default service
