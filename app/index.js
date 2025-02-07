const api_url = 'https://api.disneyapi.dev/character?pageSize=30';
const loading = document.getElementById('loading');
const titlecat = document.getElementById('title-category')
const searchInput = document.getElementById('search');
const numberpaginate = document.getElementById('number')
let data = []
let contador = 1;
let disney = []

async function fetchData(urlapi) {
    toogleLoading();
    try {
        const response = await fetch(urlapi);

        if (!response.ok) {
            throw new Error('Erro ao acessar a API');
        }

        //coverte a resposta para json
        data = await response.json();
        disney = data.data;
        console.log(data);
        displayMovies(disney);

    } catch (error) {
        console.error('Erro:', error)
    }
}

fetchData(api_url);



function displayMovies(movies) {
    const container = document.getElementById('category-body');
    container.innerHTML = '';
    numberpaginate.innerHTML = '';
    let content = '';
    let card = ''

    if (movies.length > 0) {
        movies.forEach(item => {
            card = `<div class="card" id="card">
                            <figure class="card__figure">
                                <img src="${item.imageUrl}" alt="${item.name}" />
                            </figure>
                            <h4 class="card__title">${item.name}</h4>
                            <span class="card__date">${formatCalendar(item.updatedAt)}</span>
                        </div>`;

            content += card;
        });
        if(contador > 1){
            numberpaginate.innerHTML = `<button class="number__item" onclick="numberPage(1)">1</button>`;
            numberpaginate.innerHTML += `<button class="number__item" onclick="numberPage(${contador-1})">${contador-1}</button>`
        }
        numberpaginate.innerHTML +=  `<button class="number__item" onclick="numberPage(${contador})">${contador}</button>`;

        if(contador < data.info.totalPages){
                        numberpaginate.innerHTML += `<button class="number__item" onclick="numberPage(${contador+1})">${contador+1}</button>`
            numberpaginate.innerHTML += `<button class="number__item" onclick="numberPage(${data.info.totalPages})">${data.info.totalPages}</button>`
        }

 
    } else {
        content = '<span style="color:var(--color-white); display:block; text-align: center; grid-column: span 6; ">Ops, nenhum resultado encontrado!<span>'
    }


    setTimeout(() => {
        container.innerHTML = content;


        toogleLoading();
    }, 700)

}

function listTodos() {
    titlecat.innerText = 'Todos personagens'
    toogleLoading();
    displayMovies(disney);

}

function listFilmes() {
    titlecat.innerText = 'Personagens de Filmes'
    const films = disney.filter(item => item.films.length > 1)
    toogleLoading();
    displayMovies(films);
}

function listTv() {
    titlecat.innerText = 'Personagens de Tv'
    const Tv = disney.filter(item => item.tvShows.length > 1)
    toogleLoading();
    displayMovies(Tv);
}

function listJogos() {
    titlecat.innerText = 'Personagens de Jogos'
    const jogos = disney.filter(item => item.videoGames.length > 1)
    toogleLoading();
    displayMovies(jogos);
}


function formatCalendar(item) {
    let date = new Date(item);
    let year = date.getFullYear();
    let month = formatMonth(date.getMonth())
    return year;
}

function formatMonth(month) {
    const newmonth = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    return newmonth[month]
}

function toogleLoading() {

    if (loading.style.display == "block" || loading.style.display == " ") {
        loading.style.display = 'none';
    } else {
        loading.style.display = 'block'
    }
}

function onEnterPress(event) {
    // Verifica se a tecla pressionada foi o Enter (código 13)
    if (event.key === 'Enter') {
        let result = []
        let search = event.target.value
        if (search != ' ') {
            result = disney.filter(item => item.name.toLowerCase().includes(search))
        }
        toogleLoading();
        displayMovies(result);


    }
}

searchInput.addEventListener('keydown', onEnterPress)

function next() {

    if (contador <= data.info.totalPages) {

        if (data.info.nextPage) {
            contador = contador + 1;

            fetchData(data.info.nextPage);


        }
    }
}

function prev() {

    if (contador >= 0) {

        if (data.info.previousPage) {
            contador = contador + 1;

            fetchData(data.info.previousPage);

        }
    }
}

function numberPage(number){
    if(disney){
        urlPerson = 'http://api.disneyapi.dev/character?page='+number+'&pageSize=30'
        
        fetchData(urlPerson);
    }
}