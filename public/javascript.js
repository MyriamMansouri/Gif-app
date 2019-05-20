// var target = event.target || event.srcElement;
// var id = target.id

document.getElementsByClassName("gif").addEventListener("click", selectGif);   
document.getElementById("logout").addEventListener("click", logout);   
document.getElementById("usermenu-btn").addEventListener("click", openUserMenu); 

function openUserMenu() {
    document.getElementById('usermenu').classList.toggle('visible')
}

function selectGif(gif) {
    gif.classList.toggle('selected');
}

function getGifUrl() {
    const urls = [...document.getElementsByClassName("selected")].map( el => el.currentSrc)
    console.log(urls)
    //TODOS handle error if gif already in collection   
    const selectedgifs = document.getElementsByClassName("gif")
    
    for (let i = 0 ; i < selectedgifs.length; i++) {
        selectedgifs[i].classList.remove('selected')
    }
 
    return urls
}

function addGifs() {
    const urls = getGifUrl()

    $.post( "/gifs",   {urlList: JSON.stringify(urls)} )
}

function deleteGifs() {
    const urls = getGifUrl()

    $.ajax({
        url: '/gifs',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: "json",
        data:JSON.stringify({urlList: urls}),
        error:function (xhr) {
            alert("failed");
          }
     });

     window.location.assign('/users/profile')

}


function logout() {
    $.post( "/users/logout")
}