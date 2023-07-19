//Declaração das variaveis
let relogio = document.querySelector('#relogio')
let h = document.querySelector('#h')
let m = document.querySelector('#m')
let s = document.querySelector('#s')

let hSmart = document.querySelector('#hSmart')
let mSmart = document.querySelector('#mSmart')
let sSmart = document.querySelector('#sSmart')

let data = document.querySelector('#data')
let semana = document.querySelector('#semana')

let dataHora = new Date()

//Função do relógio
function moveRelogio() {

    let momentoAtual = new Date()

    let hora = momentoAtual.getHours()
    let minuto = momentoAtual.getMinutes()
    let segundo = momentoAtual.getSeconds()

    let strHora = new String(hora)
    let strMinuto = new String(minuto)
    let strSegundo = new String(segundo)

    if (strSegundo.length == 1) segundo = '0' + segundo
    if (strMinuto.length == 1) minuto = '0' + minuto
    if (strHora.length == 1) hora = '0' + hora

    h.textContent = hora
    m.textContent = minuto
    s.textContent = segundo

    hSmart.textContent = hora
    mSmart.textContent = minuto
    sSmart.textContent = segundo

    setTimeout('moveRelogio()', 1000)
}

//Função para buscar a data
function pegarData() {
    let diaDaSemana = dataHora.getDay()
    let dia = dataHora.getDate()
    let mes = dataHora.getMonth()+1
    let ano = dataHora.getFullYear()

    let strDia = new String(dia)
    let strMes = new String(mes)

    if (strDia.length == 1) dia = '0' + dia
    if (strMes.length == 1) mes = '0' + mes

    //Condicionais para pegar o dia da semana
    switch(diaDaSemana) {
        case 0:
            diaDaSemana = 'DOM'
            break;
        case 1:
            diaDaSemana = 'SEG'
            break;
        case 2:
            diaDaSemana = 'TER'
            break;
        case 3:
            diaDaSemana = 'QUA'
            break;
        case 4:
            diaDaSemana = 'QUI'
            break;
        case 5:
            diaDaSemana = 'SEX'   
            break;
        case 6:
            diaDaSemana = 'SAB'
            break;                   
    }

    let dataAtual = dia + '/' + mes + '/' + ano
    
    semana.textContent = diaDaSemana
    data.textContent = dataAtual
}

//Chamar a função para mostrar a data
pegarData()

var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

let teste = new Date()

function getUserPosition() {
    let url = ''
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude
        let long = pos.coords.longitude
        url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=622296cd4fda08b69c46ccfa980f968d'
        fetchApi(url)
        console.log(url)
    })
}

function fetchApi(url) {
    let city = document.querySelector('.city')
    let temperatura = document.querySelector('#temp')
    let humidade = document.querySelector('#umidade')

    fetch(url)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        let tempCelcius = ((5/9) * (data.main.temp - 32)).toFixed(1)

        city.textContent = data.name
        temperatura.innerHTML = tempCelcius
        humidade.innerHTML = data.main.humidade
    })
    .catch((err) => {
        city.innerText = 'Impossivel acessar o OpenWeather. Verifique a sua conexão.'
        temperatura.innerHTML = `-`
    })
}

getUserPosition()