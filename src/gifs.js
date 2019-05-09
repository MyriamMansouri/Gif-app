const axios = require('axios')

const giphyApiKey = process.env.GIPHY_DEV_API_KEY

// access API data with axios
const searchGif = async (mySearch) => {
    try {
      let mySearchURI = encodeURIComponent(mySearch);
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${mySearchURI}&limit=12&offset=0&rating=G&lang=en`)
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  }

module.exports = searchGif;

