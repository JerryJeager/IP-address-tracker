const ipAddress = document.querySelector('.ip-address').querySelector('h2')
const userLocation = document.querySelector('.location').querySelector('h2')
const timeZone = document.querySelector('.timezone').querySelector('h2')
const isp = document.querySelector('.isp').querySelector('h2')


window.addEventListener('load', getUserIp)

const requestIp = async (res) => {
    const ip = await fetch(res)
    if (ip.status !== 200) {
        throw new Error('please check if your internet connection is stable')
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
        var map = L.map('map').setView([data.location.lat, data.location.lng], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([data.location.lat, data.location.lng]).addTo(map)
    }).catch((newError) => {alert(newError.message)
    })
}

// console.log(Error.prototype)

/*
requestIp('https://geo.ipify.org/api/v2/country,city?apiKey=at_CnS6qv6YMyDZd96XUFQQCjZ7EYmJu').then((newRes) => {
    console.log('resolved', newRes)
}).catch((err) => console.log('rejected', err.message))*/
