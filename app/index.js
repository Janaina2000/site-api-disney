const api_url = 'https://api.disneyapi.dev/character?pageSize=40';
const loading = document.getElementById('loading');
const titlecat = document.getElementById('title-category')
let disney = []

async function fetchData() {
    toogleLoading();
    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            throw new Error('Erro ao acessar a API');
        }

        //coverte a resposta para json
        const data = await response.json();
        disney = data.data;
        console.log(data);
        displayMovies(disney);

    } catch (error) {
        console.error('Erro:', error)
    }
}

fetchData();



function displayMovies(movies) {
    const container = document.getElementById('category-body');
    container.innerHTML = '';
    let content = '';
    let card = ''

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

    setTimeout(()=>{
    container.innerHTML = content;

 
        toogleLoading();
    }, 700)

}

function listTodos() {
    titlecat.innerText = 'Todos personagens'
    toogleLoading();
    displayMovies(disney);
   
}

function listFilmes(){
    titlecat.innerText = 'Personagens de Filmes'
   const films = disney.filter(item => item.films.length > 1 )
   toogleLoading();
   displayMovies(films);
}

 function listTv(){
    titlecat.innerText = 'Personagens de Tv'
    const Tv = disney.filter(item => item.tvShows.length > 1 )
    toogleLoading();
    displayMovies(Tv);
 }

 function listJogos(){
    titlecat.innerText = 'Personagens de Jogos'
    const jogos = disney.filter(item => item.videoGames.length > 1 )
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