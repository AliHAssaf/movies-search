const api_key = "9979a8d965e1ba84d8ae4cf22bf0b082";
const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc5YThkOTY1ZTFiYTg0ZDhhZTRjZjIyYmYwYjA4MiIsInN1YiI6IjY2NWM3MTQzMTNjNjU0MDM0MmM4ZTRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q34JYixQA2BDH2iG9JaC2lSi_3nLxLXtPbIwicIHtv0";

const base_url = "https://api.themoviedb.org/3";
const base_img = "https://image.tmdb.org/t/p/w500";

const get_movies = "/discover/movie";
const get_tv = "/discover/tv";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  };

const search_form = document.getElementById("search-form");
const search_results_section = document.querySelector(".search-results-section");
search_results_section.style.display = "none";
search_form.addEventListener("submit", function(e){
    e.preventDefault();
    search_results_section.style.display = "block";
    const url = `${base_url}/search/multi?query=${this.search.value}`;
    const search_results = document.querySelector(".search-results");

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        search_results.innerHTML = "";
        (json.results).map(result=>{
            search_results.innerHTML += 
            `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block custom-block-overlay">
                    <a href="detail-page.html" class="custom-block-image-wrap">
                        <img src="${base_img+result.poster_path}" class="custom-block-image img-fluid" alt="">
                    </a>

                    <div class="custom-block-info custom-block-overlay-info">
                        <h5 class="mb-1">
                            <a href="listing-page.html">
                                ${result.original_title}
                            </a>
                        </h5>

                        <p class="badge mb-0">${result.vote_average}</p>
                    </div>
                </div>
            </div>
            `;
        })
    })
    .catch(err => console.error('error:' + err));
});




async function fetch_movies(api){
    const response = await fetch(api);
    const data = await response.json();
    
    set_carosuel(data.results);
    get_movie_details(data.results);
};
async function fetch_tv(api){
    const response = await fetch(api);
    const data = await response.json();
    
    get_tv_details(data.results);
};

function get_tv_details(tvs){
    let tv_urls = [];
    const trending_episodes = document.querySelector(".trending-episodes");

    tvs.map(tv =>{
        const url = `${base_url}/tv/${tv.id}`;
        tv_urls.push(url);
    });

    const tvs_urls_to_fetch = tv_urls.slice(8,11);
    tvs_urls_to_fetch.forEach((url)=>{
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                trending_episodes.innerHTML += 
                `
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                <div class="custom-block custom-block-full">
                    <div class="custom-block-image-wrap">
                        <a href="detail-page.html">
                            <img src="${base_img+json.poster_path}" class="custom-block-image img-fluid" alt="">
                        </a>
                    </div>

                    <div class="custom-block-info">
                        <h5 class="mb-2">
                            <a href="detail-page.html">
                                ${json.original_name}
                            </a>
                        </h5>

                        <div class="profile-block d-block">
                            ${
                                json.production_companies.map(company =>{
                                    return `<img src="${base_img+company.logo_path}" class="profile-block-image img-fluid" alt="">
                                    <p>
                                        ${company.name}
                                        <strong>${company.origin_country}</strong>
                                    </p>`
                                })
                            }
                        </div>

                        <p class="mb-0">${json.overview}</p>

                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                            <a href="#" class="bi-headphones me-1">
                                <span>${json.popularity}</span>
                            </a>

                            <a href="#" class="bi-heart me-1">
                                <span>${json.vote_average}</span>
                            </a>

                            <a href="#" class="bi-chat me-1">
                                <span>${json.vote_count}</span>
                            </a>
                        </div>
                    </div>

                    <div class="social-share d-flex flex-column ms-auto">
                        <a href="#" class="badge ms-auto">
                            <i class="bi-heart"></i>
                        </a>

                        <a href="#" class="badge ms-auto">
                            <i class="bi-bookmark"></i>
                        </a>
                    </div>
                </div>
            </div>
                `;
            })
            .catch(err => console.error('error:' + err));
    });
}

function get_movie_details(movies) {
    let movies_urls = [];
    const lastest_episodes = document.querySelector(".lastest-episodes");

    movies.map(movie =>{
        const url = `${base_url}/movie/${movie.id}`;
        movies_urls.push(url);
          
    });

    const movies_urls_to_fetch = movies_urls.slice(0,2);
    movies_urls_to_fetch.forEach((url)=>{
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                lastest_episodes.innerHTML += 
                `
                <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block d-flex">
                    <div class="">
                        <div class="custom-block-icon-wrap">
                            <div class="section-overlay"></div>
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="${base_img+json.poster_path}" class="custom-block-image img-fluid" alt="">

                                <a href="#" class="custom-block-icon">
                                    <i class="bi-play-fill"></i>
                                </a>
                            </a>
                        </div>

                        <div class="mt-2">
                            <a href="#" class="btn custom-btn">
                                Subscribe
                            </a>
                        </div>
                    </div>

                    <div class="custom-block-info">
                        <div class="custom-block-top d-flex mb-1">
                            <small class="me-4">
                                <i class="bi-clock-fill custom-icon"></i>
                                50 Minutes
                            </small>

                            <small>Episode <span class="badge">15</span></small>
                        </div>

                        <h5 class="mb-2">
                            <a href="detail-page.html">
                                ${json.original_title}
                            </a>
                        </h5>

                        <div class="profile-block d-flex">
                            <img src="${base_img+json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                            <p>
                                ${json.production_companies[0].name}
                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                <strong>${json.production_companies[0].origin_country}</strong></p>
                        </div>

                        <p class="mb-0">${json.overview}</p>

                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                            <a href="#" class="bi-headphones me-1">
                                <span>${parseInt(json.popularity)}</span>
                            </a>

                            <a href="#" class="bi-heart me-1">
                                <span>${json.vote_average}</span>
                            </a>

                            <a href="#" class="bi-chat me-1">
                                <span>${json.vote_count}</span>
                            </a>

                            <a href="#" class="bi-download">
                                <span>50k</span>
                            </a>
                        </div>
                    </div>

                    <div class="d-flex flex-column ms-auto">
                        <a href="#" class="badge ms-auto">
                            <i class="bi-heart"></i>
                        </a>

                        <a href="#" class="badge ms-auto">
                            <i class="bi-bookmark"></i>
                        </a>
                    </div>
                </div>
            </div>
                `;
            })
            .catch(err => console.error('error:' + err));
    })
}

async function set_carosuel(movies) {
    const carosuel = document.querySelector(".owl-carousel");

    await movies.map((movie) => {
        const movie_title = (movie.original_title).split(" ").slice(0,3).join(" ");
        carosuel.innerHTML += 
        `
        <div class="owl-carousel-info-wrap item">
        <img src="${base_img}${movie.poster_path}" alt="">
    
        <img src="images/${movie.adult ? '+18_icon.jpg': 'verified.png'}" class="owl-carousel-verified-image img-fluid" alt="">
        <div class="owl-carousel-info">
            <h6 class="mb-2">
                ${movie_title}
            </h6>
    
            <span class="badge">${movie.release_date}</span>
    
            <span class="badge">${movie.original_language}</span>
        </div>
    </div>
        `;
    });

    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 2,
            },
            767:{
                items: 3,
            },
            1200:{
                items: 4,
            }
        }
    });
};

const api_url_movies = `${base_url}${get_movies}?api_key=${api_key}`;
const api_url_tv = `${base_url}${get_tv}?api_key=${api_key}`;
fetch_movies(api_url_movies);
fetch_tv(api_url_tv);