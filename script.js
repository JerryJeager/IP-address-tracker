const ipAddress = document.querySelector('.ip-address').querySelector('h2')
const userLocation = document.querySelector('.location').querySelector('h2')
const timeZone = document.querySelector('.timezone').querySelector('h2')
const isp = document.querySelector('.isp').querySelector('h2')
const searchInput = document.querySelector('input')
const searchBtn = document.querySelector('button')
var map = new L.Map('map')


window.addEventListener('load', getUserIp)

searchBtn.addEventListener('click', () => {
    searchIp(searchInput.value)
})

const requestIp = async (res) => {
    const ip = await fetch(res)
    if (ip.status !== 200) {
        throw new Error('')
    }
    const data = ip.json()
    return data
}

function getUserIp() {
    requestIp('https://geo.ipify.org/api/v2/country,city?apiKey=at_CnS6qv6YMyDZd96XUFQQCjZ7EYmJu').then((data) => {
        console.log('resolved', data)
        ipAddress.textContent = `${data.ip}`
        userLocation.textContent = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`
        timeZone.textContent = `GMT ${data.location.timezone}`
        isp.textContent = `${data.isp}`
        map.setView(new L.LatLng(data.location.lat, data.location.lng), 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let marker = new L.marker([data.location.lat, data.location.lng]).addTo(map)
    }).catch((newError) => {alert(`${newError.message}: check your internet connection`)
    })
}

function searchIp(ipAddressValue){
    requestIp(`https://geo.ipify.org/api/v2/country,city?apiKey=at_CnS6qv6YMyDZd96XUFQQCjZ7EYmJu&ipAddress=${ipAddressValue}`).then((data) => {
        console.log('resolved', data)
        ipAddress.textContent = `${data.ip}`
        userLocation.textContent = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`
        timeZone.textContent = `GMT ${data.location.timezone}`
        isp.textContent = `${data.isp}`
        map.setView(new L.LatLng(data.location.lat, data.location.lng), 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let marker = new L.marker([data.location.lat, data.location.lng]).addTo(map)
    }).catch((newError) => {alert(`${newError} :Invalid IP Address`)
    })
}
// 192.212.174.101
// https://geo.ipify.org/api/v2/country?apiKey=at_CnS6qv6YMyDZd96XUFQQCjZ7EYmJu&ipAddress=8.8.8.8
