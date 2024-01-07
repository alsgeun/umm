require('dotenv').config();
console.log(process.env.Authorization_Token);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'process.env.Authorization_Token'
    }
};
function roadTV() {
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=korea&page=1', options)
        .then(response => response.json())
        .then(data => {
            let apIresults = data.results;
            apIresults.forEach(element => {
                let tvPP = 'https://image.tmdb.org/t/p/w300' + element.poster_path;
                let tvON = element.original_name;
                let tvVA = element.vote_average;
                let tvOV = element.overview;
                let cardContainer = document.querySelector('.cardcontainer');
                let cardBox = document.createElement('div');
                cardBox.className = 'cardbox';
                cardBox.innerHTML = `
                    <img class="cardimg" src="${tvPP}" alt="${tvON}">
                    <div class="card-body">
                        <h5 class="cardtitle">${tvON}</h5>
                        <p class="rate">평점: ${tvVA} / 10.0</p>
                        <p class="card-text">${tvOV}</p>
                    </div>
                `;
                cardContainer.appendChild(cardBox);
            });
        })
        .catch(err => console.error(err));
}

window.onload = function () {
    roadTV();
}

