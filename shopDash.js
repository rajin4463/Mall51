//API url
const BASEURL = 'https://sore-narrow-seashore.glitch.me/'

const name = document.getElementById('shopN');
const tag = document.getElementById('tagAdd');
const save = document.getElementById('save');

let category;

//on load display info of shop on webpage 
window.addEventListener("load", function(){
    document.getElementById('dashboard').reset()
    const ShopID = localStorage.getItem('ShopID')
    try{
        fetch(BASEURL+'shopdash/get/'+ShopID)
        .then((response) => response.json())
        .then((data) => {
            name.innerText = data.ShopName
            category = data.Category
            if(data.Discounts == "true"){
                document.getElementById('discounts').checked = true;
            }else if(data.Discounts == "false"){
                document.getElementById('discounts').checked = false;
            }
        })
    }catch(err){
        console.log(err);
    }
});

//function to add porduct categories to be saved
tag.addEventListener('click', (e)=>{
    e.preventDefault()
    const vals = document.getElementById('productCats').value
    let result = vals.split(",").map(function (value) {
        return value.trim();
    });
    for(i=0; i < result.length; i++){
        category.push(result[i])
    }
    document.getElementById('input-class').innerText = vals.toString();
    const taga = document.getElementById('tags')
    taga.style.display = "block";
});

//function to convert images to base64
const toBase64 = file => new Promise((reslove, reject)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => reslove(reader.result)
    reader.onerror = err => reject(err);
})

//main save function that saved data to the database
save.addEventListener('click', async (e)=>{
    e.preventDefault()
    const fileInput = document.getElementById('image').files[0]
    const discount = document.getElementById('discounts').checked;
    const tags = category

    let state = true

    let result;
    async function main(){
        result = await toBase64(fileInput);
    }
    await main();

    const ID = localStorage.getItem('ShopID')
    let ShopID = Number(ID)
    let ImgID = ShopID
    let image = result
    fetch(BASEURL+'shopdash/add-img', {
        method: "PATCH",
        body: JSON.stringify({ShopID:ShopID, ImgID:ImgID, img:image}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if(!json.status == "Success"){
            state = false
        }
    });

    fetch(BASEURL+'shopdash/update/'+ShopID, {
        method: "PATCH",
        body: JSON.stringify({Category:tags, Discounts:discount}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if(!json.status == "data saved"){
            state = false
        }

        if(state == true){
            alert("Data saved")
        }else{
            alert("Error! Data not saved")
        }
    })
})