var modal = document.getElementById('01');

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}
