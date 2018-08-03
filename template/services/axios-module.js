class Axios {
  get http () {
    return window
      .$nuxt
      .$axios
  }
}

const axios = new Axios()
export default axios
