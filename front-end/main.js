document.addEventListener("DOMContentLoaded", function () {
    var mainMenu = document.querySelector('.button-menu');

    mainMenu.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            var option = event.target.textContent.trim();
            showForegroundMenu(option);
        }
    });
});

function showForegroundMenu(option) {
    var foregroundMenu = document.getElementById('foregroundMenu');
    foregroundMenu.innerHTML = `
        <h2>Foreground Menu (${option})</h2>
        <button class="back-button" onclick="hideForegroundMenu()">Back</button>
        <!-- Add additional buttons or content for the foreground menu as needed -->
    `;
    foregroundMenu.style.display = 'block';
}

function hideForegroundMenu() {
    var foregroundMenu = document.getElementById('foregroundMenu');
    foregroundMenu.style.display = 'none';
}
