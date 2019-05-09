// var target = event.target || event.srcElement;
// var id = target.id

document.getElementsByClassName("gif").addEventListener("click", selectGif);   

function selectGif(gif) {
    gif.classList.toggle('selected');
}

function getGifUrl() {
    const urls = [...document.getElementsByClassName("selected")].map( el => ({url: el.currentSrc}))
    $.post( "/gifs",   {urlList: JSON.stringify(urls)} )
}