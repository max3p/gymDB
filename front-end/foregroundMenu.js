document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll('.button-menu button');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var option = this.textContent.trim();
            showForegroundMenu(option);
        });
    });
});

function showForegroundMenu(option) {
    var foregroundMenu = document.getElementById('foregroundMenu');
    foregroundMenu.innerHTML = `
        <h2>Foreground Menu (${option})</h2>
        <button onclick="hideForegroundMenu()">Back</button>
        <!-- Add additional buttons or content for the foreground menu as needed -->
    `;
    foregroundMenu.style.display = 'block';
}

function hideForegroundMenu(){
    var foregroundMenu = document.getElementById('foregroundMenu');
    foregroundMenu.style.display = 'none';
}
