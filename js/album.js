const getalbum=async()=>{
    let res1=await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=bts`)
    let artistId=await res1.json()
    artists=artistId.artists
    artistId=artists[0].idArtist

    let res=await fetch(`https://theaudiodb.com/api/v1/json/2/album.php?i=${artistId}`)
    let data=await res.json()
    data=data.album.slice(0,5)

    let albumContainer=document.getElementById('all-album')
    data.forEach(album => {
    let div=document.createElement('div')
    div.innerHTML=`
    <div><img src="${album.strAlbumThumb}" alt="artist-img" /></div>`
    albumContainer.appendChild(div)
    });
}
getalbum()