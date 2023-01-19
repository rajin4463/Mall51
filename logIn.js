
+function($) {
  $('.palceholder').click(function() {
    $(this).siblings('input').focus();
  });

  $('.form-control').focus(function() {
    $(this).parent().addClass("focused");
  });

  $('.form-control').blur(function() {
    var $this = $(this);
    if ($this.val().length == 0)
      $(this).parent().removeClass("focused");
  });
  $('.form-control').blur();

  // validation
  $.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'validate-tooltip'
  });

  $("#formvalidate1").validate({
    rules: {
      shopm_userName: {
        required: true,
        minlength: 4
        
      },
      shopm_userPassword: {
        required: true,
        minlength: 4  
      }
    },
    messages: {
      shopm_userName: {
        required: "Please enter your username.",
        minlength: "Please provide valid username."
        
      },
      shopm_userPassword: {
        required: "Enter your password to Login.",
        minlength: "Please provide valid username."
        
      }
    }
  });


  // EDITED
  $("#formvalidate2").validate({
    rules: {
      admin_userName: {
        required: true,
        minlength: 4
 
      },
      admin_userPassword: {
        required: true,
        minlength: 4
        
      }
    },
    messages: {
      admin_userName: {
        required: "Please enter your username.",
        minlength: "Please provide valid username."
        
      },
      admin_userPassword: {
        required: "Enter your password to Login.",
        minlength: "Please provide valid username."
        
      }
    }
  });
  // STOP



}(jQuery);
/*
//const express = require("express")
//const axios = require("axios");

// SHOP MANAGER SUBMIT BUTTON EVENT 
// Get the submit button

const submitBtn1 = document.getElementById("shopManLogIn");
let BASE_URL = "https://sore-narrow-seashore.glitch.me/";

// Add an event listener to the submit button
submitBtn1.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Working");

    // Get the username and password from the input fields
    const username = document.getElementById("shopm_userName").value;
    const password = document.getElementById("shopm_userPassword").value;

    // Send the login request
    axios.get(BASE_URL + "login/shopLogIn", {
      UserName: username,
      Password: password
    })
    .then(response => {
        // Store the JWT token in a cookie
        //document.cookie = `token=${response.data["accesToken"]}; expires=; path=/;HttpOnly;secure`;
        // Store the ShopID and Role in local storage
        localStorage.setItem("shopId", response.data.ShopID);
        localStorage.setItem("role", response.data.Role);
        console.log(response);
        alert("Success");
    })
    .catch(error => {
        console.log(error);
        alert("Error");
    });
});

// ADMIN SUBMIT BUTTON EVENT 
// Get the submit button
const submitBtn2 = document.getElementById("adminLogIn"); 

// Add an event listener to the submit button
submitBtn2.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the username and password from the input fields
    const username = document.getElementById("admin_userName").value;
    const password = document.getElementById("admin_userPassword").value;

    // Send the login request
    axios.post(BASE_URL + "login/adminLogIn", {
        UserName: username,
        Password: password
    })
    .then(response => {
        // Store the JWT token in a cookie
        //document.cookie = `token=${response.data["accesToken"]}; expires=; path=/;HttpOnly;secure`;
        // Store the ShopID and Role in local storage
        localStorage.setItem("shopId", response.data.ShopID);
        localStorage.setItem("role", response.data.Role);
    })
    .catch(error => {
        console.log(error);
    });
});
*/




/*
function SubmitShopMan() {
  // Make the API call to the backend
  fetch(BASE_URL + "login/shopLogIn")
    .then((response) => response.json())
    .then((data) => {
      // Store the data in local storage
      localStorage.setItem("shopId", data.ShopID);
      localStorage.setItem("role", data.Role);
    });
}

// Attach the function to the submit button
let submitBtn1 = document.getElementById("shopManLogIn");
submitBtn1.addEventListener("click", SubmitShopMan);




function SubmitAdmin() {
  // Make the API call to the backend
  fetch(BASE_URL + "login/adminLogIn")
    .then((response) => response.json())
    .then((data) => {
      // Store the data in local storage
      localStorage.setItem("shopId", data.ShopID);
      localStorage.setItem("role", data.Role);
    });
}

// Attach the function to the submit button
let submitBtn2 = document.getElementById("adminLogIn");
submitBtn2.addEventListener("click", SubmitAdmin);
*/

/*
let BASE_URL = "https://sore-narrow-seashore.glitch.me/";

/////////////////////////////////////////////////////////////////////// 
function shopManSubmit() {
  // Prepare the data to be sent in the request body
  const data = {
    ShopID: AD_searchID,
    Role: "Shop Manager"
  };
  
  // Make the API call to the backend
  fetch(BASE_URL + "login/shopLogIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      // Store the data in local storage
      localStorage.setItem("shopId", data.ShopID);
      localStorage.setItem("role", data.Role);
      alert("success");
    });
}

// Attach the function to the submit button
let submitBtn1 = document.getElementById("shopManLogIn");
submitBtn1.addEventListener("click", shopManSubmit);



///////////////////////////////////////////////////////////////
function adminSubmit() {
  // Prepare the data to be sent in the request body
  const data = {
    ShopID: AD_searchID,
    Role: "Admin"
  };
  
  // Make the API call to the backend
  fetch(BASE_URL + "login/adminLogIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      // Store the data in local storage
      localStorage.setItem("shopId", data.ShopID);
      localStorage.setItem("role", data.Role);
    });
}

// Attach the function to the submit button
let submitBtn2 = document.getElementById("adminLogIn");
submitBtn2.addEventListener("click", adminSubmit);
*/

let BASE_URL = "https://sore-narrow-seashore.glitch.me/";

/////////////////////////////////////////////////////////////////////
const form1 = document.getElementById("formvalidate1");
form1.addEventListener("submit", (event) => {
  event.preventDefault();
  const UserName = document.getElementById("shopm_userName").value;
  const Password = document.getElementById("shopm_userPassword").value;
  // Make the API call to the backend
  fetch(BASE_URL + "login/shopLogIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserName, Password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      if (data.ShopID && data.Role) {
        localStorage.setItem("ShopID", data.ShopID);
        localStorage.setItem("Role", data.Role);
        localStorage.setItem('Token', data.token);
        // do i have to redirect the user to the admin dashboard???
        window.location = "Shop-Dash.html";
      } else {
        alert("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


/////////////////////////////////////////////////////////////////////
const form2 = document.getElementById("formvalidate2");
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const UserName = document.getElementById("admin_userName").value;
  const Password = document.getElementById("admin_userPassword").value;
  // Make the API call to the backend
  fetch(BASE_URL + "login/adminLogIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserName, Password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      if (data.ShopID && data.Role) {
        localStorage.setItem("ShopID", data.ShopID);
        localStorage.setItem("Role", data.Role);
        localStorage.setItem('Token', data.token);
        // redirect the user 
        window.location = "admin.html";
      } else {
        alert("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
