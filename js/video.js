const getvideo=async()=>{
    let res1=await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay`)
    let artistId=await res1.json()
    artists=artistId.artists
    artistId=artists[0].idArtist

    let res=await fetch(`https://theaudiodb.com/api/v1/json/2/mvid.php?i=${artistId}`)
    let data=await res.json()
    data=data.mvids.slice(0,5)

    
let albumContainer=document.getElementById('all-video')
    data.forEach(video => {
        let {strTrackThumb,strMusicVid}=video

        let div=document.createElement('div')
        div.innerHTML=`
        <div><img src="${strTrackThumb}"></img></div>`
        albumContainer.appendChild(div)
    });

}
getvideo()