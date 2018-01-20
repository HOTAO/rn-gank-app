import baseApi from './baseApi'

export default api = {
  fetchData(category) {
    const url = baseApi.category + category
    return fetch(url).then((response) => response.json())
  },
  HomePageData(category) {
    const url = baseApi.daily + category
    console.log(url)
    return fetch(url).then(response => response.json())
  },
  fetchRandomData(category) {
    const url = baseApi.random + category
    return fetch(url).then(response => response.json())
  }
}