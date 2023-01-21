//validation for the form 'formy' 
function validation() {
    let x = document.forms["formy"]["shname"].value;
    if (x == ""){
        alert("shop name must be filled out");
        return false;
    }

    if( document.formy.nshop.value == "" || isNaN( document.formy.nshop.value ) ||
            document.formy.nshop.value.length != 4 ) {
            // length of the id should be 4 characters
            alert( "Please provide an Id in the format ####." );
            document.myForm.nshop.focus() ;
            return false;
    }

    let y = document.forms["formy"]["lo"].value;
    if ( y == ""){
        alert("location must be filled out");
        return false;
    }

    let z = document.forms["formy"]["fname"].value;
    if (z == ""){
        alert("Owner's first name must be filled out");
        return false;
    }

    let w = document.forms["formy"]["lname"].value;
    if (w == ""){
        alert("Owner's last name must be filled out");
        return false;
    }

    let v = document.forms["formy"]["UserName"].value;
    if (v == ""){
        alert("Username must be filled out");
        return false;
    }

    let r = document.forms["formy"]["Password"].value;
    if (r == ""){
        alert("Password must be filled out");
        return false;
    }

    return (true);

}

//////////////////////////////////////////////////////////////////

// asigning the base url which is used for the requests
let BASE_URL = "https://sore-narrow-seashore.glitch.me/";

//to select the element in the HTML document with the given id (JS DOM)
// store it in below variable to handle the event
const form = document.getElementById("sub");

//excuted when click ........handle the promise returned by fetch
form.addEventListener("click", async (event)=>{
    event.preventDefault();  // Prevent the default behavior of the form submission.
    const validate = validation();
    const ShopID= document.getElementById("nshop").value;    //captures the values of the all input fields 
    const ShopName = document.getElementById("shname").value;
    const Location = document.getElementById("lo").value;
    const Category = document.getElementById("Category").value;
    const Discounts = false;
    const UserName = document.getElementById("UserName").value;
    const Password = document.getElementById("Password").value;
    const FirstName = document.getElementById("fname").value;
    const LastName = document.getElementById("lname").value;
    
 if (validate == true){   // frist the validation will happen and assings the values
    try {          //first POST request 
        const response = await fetch(BASE_URL + "admin/shopDetails",{
            method: "POST",
            body: JSON.stringify({ShopID, ShopName, Location, Category, Discounts }),
            headers: {
                "Content-Type": "application/json",
            }   
        }).then((response)=> response.json())    //checks if the response status is 'Success' or not.
        .then((res)=>{
            if (!res.status == 'Success'){
                alert("Error");     // display an alert 
            }else{
                alert("Saved")
            }
        })
       //second POST request
        const response2 = await fetch(BASE_URL + "admin/userDetails",{
            method: "POST",
            body: JSON.stringify({ShopID, FirstName, LastName, UserName, Password }),  //values of the variables captured from the form input fields
            headers: {                                                                 //request body send the user details to stored.
                "Content-Type": "application/json",
            }
        }).then((response)=> response.json())      //checks if the response status is 'Success' or not. 
        .then((res)=>{
            if (!res.status == 'Success'){
                alert("Error");      // display an alert 
            }else{
            }
        })
    } catch (error) {
        console.error(error);     // to get server response status 
    }
}

})
