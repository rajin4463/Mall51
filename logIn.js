
+function($) {
  // Bind click event to elements with class 'placeholder'
  // When clicked, focuses on the input element that is a sibling of the clicked element.
  $('.palceholder').click(function() {
    $(this).siblings('input').focus();
  });

  // Bind focus event to elements with class 'form-control'
  // When focused, adds the class "focused" to the parent element of the focused element.
  $('.form-control').focus(function() {
    $(this).parent().addClass("focused");
  });

  // Bind blur event to elements with class 'form-control'
  // When blurred, checks if the value of the element is empty, if so removes the class "focused" from the parent element of the blurred element.
  $('.form-control').blur(function() {
    var $this = $(this);
    if ($this.val().length == 0)
      $(this).parent().removeClass("focused");
  });
  // Triggers the blur event on all elements with class 'form-control' when page loads
  $('.form-control').blur();

  /////////////////// VALIDATION /////////////////////////////

  // Uses jQuery Validate plugin to validate the form with id 'formvalidate1'
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
  // Uses jQuery Validate plugin to validate the form with id 'formvalidate2'
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


// set a constant BASE_URL to the base URL of the backend server

let BASE_URL = "https://sore-narrow-seashore.glitch.me/";

/////////////////////////////////////////////////////////////////////

// attach a submit event listener to a form "formvalidate1" (shop manager login)
const form1 = document.getElementById("formvalidate1");
form1.addEventListener("submit", (event) => {
  // prevent the default behavior of the form when it's submitted
  event.preventDefault();
  // retrieve the values of the input fields "shopm_userName" and "shopm_userPassword"
  const UserName = document.getElementById("shopm_userName").value;
  const Password = document.getElementById("shopm_userPassword").value;
  // Make the API call to the backend
  fetch(BASE_URL + "login/shopLogIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // send the input field values in the body of the request as a JSON object
    body: JSON.stringify({ UserName, Password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      // check if the response contains a "ShopID" and "Role" property
      if (data.ShopID && data.Role) {
        // store these values in the local storage, along with a token
        localStorage.setItem("ShopID", data.ShopID);
        localStorage.setItem("Role", data.Role);
        localStorage.setItem('Token', data.token);
        // redirect the user to the "Shop-Dash.html" page
        window.location = "Shop-Dash.html";
      } else {
        // If the response does not contain the "ShopID" and "Role" properties, it alerts the user that the credentials are invalid
        alert("Invalid credentials");
      }
    })
    .catch((err) => {
      // log any errors that occur during the fetch to the console
      console.log(err);
    });
});


/////////////////////////////////////////////////////////////////////

// attach a submit event listener to form "formvalidate2" (admin login)
const form2 = document.getElementById("formvalidate2");
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  // retrieve the values of the input fields "admin_userName" and "admin_userPassword"
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
        // redirect the user to the "admin.html" page
        window.location = "admin.html";
      } else {
        alert("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
