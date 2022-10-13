let api = "https://api.themoviedb.org/3/discover/movie?api_key=8b7969982f47c8f2de7676a429069e81&sort_by=popularity.desc&page=1"

async function getMovies(url) {
    let res = await fetch(url)
    let data = await res.json()
    showMovie(data.results)
}

function showMovie(movies) {
    
    let main = document.getElementById("main")
    main.innerHTML = ''

    movies.forEach((movie) => {
        let img = "https://image.tmdb.org/t/p/w1280"

        let { title, poster_path, vote_average, release_date} = movie

        let movieAdd = document.createElement('div')
        movieAdd.classList.add('movie')

        movieAdd.innerHTML = `
            <img src="${img + poster_path}" alt="${title}">
            <div class="movie-info">
            <h4>${title}</h4>
            <p>${release_date}</p>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>`
        main.appendChild(movieAdd)
    })
}

function getClassByRate(vote) {
    if(vote >= 7) {
        return 'green'
    } else if(vote >= 6) {
        return 'yellow'
    } else {
        return 'red'
    }
}

const form = document.getElementById("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let searchApi = "https://api.themoviedb.org/3/search/movie?api_key=8b7969982f47c8f2de7676a429069e81&query="
    let search = document.getElementById("search")
    let searchIng = search.value

    if(searchIng && searchIng !== '') {
        getMovies(searchApi + searchIng)
        search.value = ''
    } else {
        window.location.reload()
    }
})

getMovies(api)