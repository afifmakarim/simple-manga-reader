class DataSource {
    static searchManga(keyword) {
        return fetch(`https://kitsu.io/api/edge/manga?filter[text]=${keyword}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson.data) {
                console.log("test", responseJson.data);
                return Promise.resolve(responseJson.data);
            } else {
                return Promise.reject(`${keyword} is not found`);
            }
        })
    }
 }
  
 export default DataSource;