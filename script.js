const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// unsplash api
const count = 30;
const apiKey = 'IGZ9UzfKuP3pnvV7qILz07e4-iSywfRI0XWKy389aEs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



//check if all image are loaded

function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded  === totalImages)
    {
        ready = true;
        loader.hidden = true;   
        console.log('ready= ',ready);
        initialLoad = false;
        count = 30;
    };
};

//helper function to set attributes on dom elements

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Create elements for links and photos

function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total-image',totalImages);
    //run
    photosArray.forEach((photo)=>{
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //put <img> inside <a>, then put both inside imageContainer

        // event listner, check when each is finished loading 

        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from unsplash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    }
    catch(error){

    }
}


window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        getPhotos();
    } 
});

getPhotos();
