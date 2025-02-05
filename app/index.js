const api_url = 'https://api.disneyapi.dev/character';
let disney = []

async function fetchData() {
    try{
        const response = await fetch(api_url);

        if(!response.ok){
            throw new Error('Erro ao acessar a API');
        }

        //coverte a resposta para json
        const data = await response.json();
        disney = data.data;
        console.log(data);
        displayMovies(disney);

    } catch (error){
        console.error('Erro:', error)
    }
}

fetchData();

function displayMovies(movies){
    const container = document.getElementById('category-body');
    container.innerHTML = '';

    movies.forEach(item =>{
        let card = `<div class="card" id="card">
                        <figure class="card__figure">
                            <img src="${item.imageUrl}" alt="" />
                        </figure>
                        <h4 class="card__title">${item.name}</h4>
                        <span class="card__date"> ${new Date(item.createdAt).getFullYear()}</span>
                    </div>`;

        container.innerHTML += card;

    });
}