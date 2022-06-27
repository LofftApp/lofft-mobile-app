import axios from 'axios';

export const geocoding = addressInput => {

  const addresses = []

   addressInput.map(el => {

      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: el,
            key: 'AIzaSyAD6t5T0t_ZJA5AELVE8JTboDGzKzERMBg',
        }
        }).then(response => { addresses.push(response.data.results[0].geometry.bounds.northeast)
          console.log(addresses)
          return addresses
        })
  })


  // addressInput.map(el => {
  //   addresses.push(
  //   axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
  //     params: {
  //       address: el,
  //       key: "AIzaSyAD6t5T0t_ZJA5AELVE8JTboDGzKzERMBg"
  //     }
  //   }).then(response => addresses.push(response.data.results[0].geometry.bounds.northeast))
  // })

  console.log(addresses)

}
