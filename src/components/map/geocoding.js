import axios from 'axios'

export const geocoding = async (addressInput) => {
  let location = addressInput;
  axios.get("https://maps.googleapis.com/maps/api/geocode/json", {params: {
    address: location,
    key: "AIzaSyAD6t5T0t_ZJA5AELVE8JTboDGzKzERMBg"
  }
  }).then(response => console.log(response.data.results[0]))


}
