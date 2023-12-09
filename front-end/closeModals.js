// closeModals.js

// Get the modal
var modal = document.getElementById('id01');
// var modal = document.getElementById('id11');
var sModal = document.getElementById('id02');
var suModal = document.getElementById('id04');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == sModal) {
        sModal.style.display = "none";
    } else if (event.target == suModal) {
        suModal.style.display = "none";
    }
};
function navigateToPage() {

    window.location.href = "login.html";
  }
  function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }