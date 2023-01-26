console.log("Working...");
BASE_URL = "https://sore-narrow-seashore.glitch.me/";
let cards = document.querySelector('.cards');
let searchBar = document.getElementById('search');
document.getElementById('loading').style.display = 'flex';

// Functions for the hamburger menu
function openNav() {
    document.getElementById("hamburgerNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("hamburgerNav").style.width = "0";
}
// Function to display all shop details under the discount category
async function displayDiscountCategory(url){
    const response = await fetch(url);
    let discount = await response.json();
    console.log(discount);
    let fragment = document.createDocumentFragment();
    if (discount.length > 0){
        for (let i = 0; i < discount.length; i++){
            if (discount[i].Discount == "true"){
                let responseImg = await fetch(BASE_URL + `home/img/${discount[i].ShopID}`)
                let imageData = await responseImg.json();
                console.log(discount[i].ShopName);
                let li = document.createElement("li");
                li.classList.add("item");

                let divCard = document.createElement("div");
                divCard.classList.add("card");

                let divImage = document.createElement("div");
                divImage.classList.add("image");
                let img = document.createElement("img");
                if(!imageData.image==''){
                    img.src = imageData.image;
                    img.alt = `${discount[i].ShopName} Image`;
                }else{
                    let responseImg = await fetch(BASE_URL + `home/img/9999`)
                    let imageData = await responseImg.json();
                    img.src = imageData.image;
                }
                divImage.appendChild(img);
                divCard.appendChild(divImage);

                let divContent = document.createElement("div");
                divContent.classList.add("content");
                let h2 = document.createElement("h2");
                h2.innerText = discount[i].ShopName;
                divContent.appendChild(h2);
                let p = document.createElement("p");
                p.innerText = discount[i].ShopLocation;
                divContent.appendChild(p);
                divCard.appendChild(divContent);

                li.appendChild(divCard);
                fragment.appendChild(li);
            }
        }
        cards.appendChild(fragment);
        document.getElementById('loading').style.display = 'none';
    }
}
displayDiscountCategory(BASE_URL + "home");
// Eventlistner for the search bar when "Enter" key is hit
searchBar.addEventListener("keyup", function (event) {
    if (event.keyCode === 13){
        let userInput = searchBar.value;
        searchFunction(BASE_URL + "home/search/ShopName?ShopName=" + userInput, BASE_URL + "home/search/Category?Category=" + userInput);
        
    }
})
// Function for the search bar to search by shop name or category
async function searchFunction(urlShop, urlCategory){
    document.getElementById('loading').style.display = 'flex';
    cards.innerHTML = "";
    try{
        const response = await fetch(urlShop);
        let data = await response.json();
        if(data){
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < data.length; i++){
                let responseImg = await fetch(BASE_URL + `home/img/${data[i].ShopID}`)
                let imageData = await responseImg.json();
                let li = document.createElement("li");
                li.classList.add("item");

                let divCard = document.createElement("div");
                divCard.classList.add("card");

                let divImage = document.createElement("div");
                divImage.classList.add("image");
                let img = document.createElement("img");
                if(!imageData.image==''){
                    img.src = imageData.image;
                    img.alt = `${discount[i].ShopName} Image`;
                }else{
                    let responseImg = await fetch(BASE_URL + `home/img/9999`)
                    let imageData = await responseImg.json();
                    img.src = imageData.image;
                }
                divImage.appendChild(img);
                divCard.appendChild(divImage);

                let divContent = document.createElement("div");
                divContent.classList.add("content");
                let h2 = document.createElement("h2");
                h2.innerText = data[i].ShopName;
                divContent.appendChild(h2);
                let p = document.createElement("p");
                p.innerText = data[i].ShopLocation;
                divContent.appendChild(p);
                divCard.appendChild(divContent);

                li.appendChild(divCard);
                fragment.appendChild(li);
            }
            cards.appendChild(fragment);
            document.getElementById('loading').style.display = 'none';
        }
        else{
            response = await fetch(urlCategory);
            data = await response.json();
            if(data){
                let fragment = document.createDocumentFragment();
                for (let i = 0; i < data.length; i++){
                    let li = document.createElement("li");
                    li.classList.add("item");

                    let divCard = document.createElement("div");
                    divCard.classList.add("card");

                    let divImage = document.createElement("div");
                    divImage.classList.add("image");
                    let img = document.createElement("img");
                    img.src = "./img/little_hearts.jpg";
                    img.alt = "";
                    divImage.appendChild(img);
                    divCard.appendChild(divImage);

                    let divContent = document.createElement("div");
                    divContent.classList.add("content");
                    let h2 = document.createElement("h2");
                    h2.innerText = data[i].ShopName;
                    divContent.appendChild(h2);
                    let p = document.createElement("p");
                    p.innerText = data[i].ShopLocation;
                    divContent.appendChild(p);
                    divCard.appendChild(divContent);

                    li.appendChild(divCard);
                    fragment.appendChild(li);
                }
                cards.appendChild(fragment);
                document.getElementById('loading').style.display = 'none';
            }
        }
    }
    catch(error){
        console.log(error);
    }
}