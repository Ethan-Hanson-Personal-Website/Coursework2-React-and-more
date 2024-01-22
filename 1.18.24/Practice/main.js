const form = document.querySelector('form');
const input = document.querySelector('input');
const API_KEY = '0rdTUWZdmbUT0vBo4NOEXFyTSkYesHCe';
const results = ;


form.addEventListener('submit', async function (e) {
    e.preventDefault();

    //when for is submitted read and store the user infor

    //get input valuee 
    const searchTerm = input.value;
    console.log(searchTerm);
    input.value = "";


    //fetch the data
    const API_URL = 'https://api.giphy.com/v1/gifs/search' + API_KEY + '&rating';
    try {
        const response = await fetch(API_URL);
        const data = await response.json;
        renderGifs(data.data)
    } catch (err) {
        console.log(err)
    }

});

function renderGifs(gifs){
    const template = gifs.map(gif => {
        return `
        <div>
        <img src = "${gif.images.fixed_height.url}" alt"${gif.title}">
        </div>
        `
    })
    results.innerHTML = template.join('');
}
