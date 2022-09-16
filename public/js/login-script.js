const getEmail = document.querySelector("#email-login");
const getPassword = document.querySelector("#password-login");
const onButton = document.querySelector("#button-login");
let validatingText = document.querySelectorAll(".validating-text");
let loginRoute = require('./routes/loginRoute')


const objInformation =  {
  email: '',
  password: '' 
}

onButton.addEventListener("click", function (event) {
  event.preventDefault();
  invalidOrValid();
})

function invalidOrValid () {
  if (checkInformation() === false) {

    for(let i = 0; i <= validatingText.length; i++) {
      validatingText[i].textContent = "Login or password invalid!";
      getEmail.style.border = "1px solid red";
      getPassword.style.border = "1px solid red";
    }
  }
   else { 
    validatingText[0].textContent = "";
    validatingText[1].textContent = "";
    getEmail.style.border = "";
    getPassword.style.border = "";
  }
}
function checkInformation () {
  if (getEmail.value === objInformation.email && getPassword.value === objInformation.password) {
    return true;
  }
  else {
    return false;
  }
}


