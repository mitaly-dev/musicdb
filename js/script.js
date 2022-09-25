const artistData=async(value)=>{
    let res=await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${value}`)
    let data=await res.json()
    displayArtist(data.artists)
}
artistData('')

            // displayOrNot('not-found',false)
            // displayOrNot('errmsg',true)

//all artist
const displayArtist=(data)=>{
    displayOrNot('progress',false)
    if(data==null){
        displayOrNot('not-found',true)
        return
      }
      else{
        displayOrNot('not-found',false)
      }
    let artistContainer=document.getElementById('all-artist')
    artistContainer.textContent=''
    data.forEach(artist=>{
        let {idArtist,strArtistThumb,strBiographyEN,strFacebook,strWebsite}=artist
        let div=document.createElement('div')
        div.classList.add('text-center')
        div.innerHTML=
        `
        <div><img src="${strArtistThumb}" alt="artist-img" /></div>
        <label onclick="atristDetails(${idArtist})" for="my-modal-3" class="cursor-pointer modal-button text-slate-300 py-2">Details</label>
        `
        artistContainer.appendChild(div)
        document.getElementById('progress').classList.add('hidden')
    })
    
}
        
const atristDetails=async(id)=>{
    let res=await fetch(`https://theaudiodb.com/api/v1/json/2/artist.php?i=${id}`)
    let data=await res.json()
    data=data.artists[0]
    let {idArtist,strArtist,strArtistLogo,intBornYear,intDiedYear,strArtistThumb,strBiographyEN,strFacebook,strWebsite}=data

   document.getElementById('modal-body').innerHTML=`
   <img class="w-1/4" src="${strArtistLogo?strArtistLogo:''}" alt="artist-img" />
   <img class="w-2/4" src="${strArtistThumb?strArtistThumb:''}" alt="artist-img" />
   <h3><span class='font-semibold'>Name :</span>${strArtist}</h3>
   <h3><span class='font-semibold'>BandBornYear : </span>${intBornYear}</h3>
   <h3><span class='font-semibold'>BandDiedYear :  </span>${intDiedYear?intDiedYear:'N/A'}</h3>
   <h3><span class='font-semibold'>Biography :  </span>${strBiographyEN?strBiographyEN:'No link provide'}</h3>
   <a href='${strWebsite}'><span class='font-semibold'>Website :  </span>${strWebsite?strWebsite:'No link provide'}</a>
   `
}


// //search
let inputValue=document.getElementById('search-field')
inputValue.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
         displayOrNot('progress',false)
        document.getElementById('all-artist').textContent=''
        document.getElementById('progress').classList.remove('hidden')
        let value=inputValue.value
        inputValue.value=''
        if(value==''){ 
            displayOrNot('progress',false)
            displayOrNot('not-found',false)
            displayOrNot('errmsg',true)
            return
        }
        else{
            document.getElementById('errmsg').classList.add('hidden')
        }
        artistData(value)
    } 
})

document.getElementById('search-btn').addEventListener('click',()=>{
    displayOrNot('progress',false)
    document.getElementById('all-artist').textContent=''
    document.getElementById('progress').classList.remove('hidden')
    let value=inputValue.value
    inputValue.value=''
    if(value==''){ 
        displayOrNot('progress',false)
        displayOrNot('not-found',false)
        displayOrNot('errmsg',true)
        return
    }
    else{
        document.getElementById('errmsg').classList.add('hidden')
    }
    artistData(value)
})





const displayOrNot=(id,display)=>{
    let element=document.getElementById(id)
   if(display===true){
    element.classList.remove('hidden')
   }
   else{
    element.classList.add('hidden')
   }
}
