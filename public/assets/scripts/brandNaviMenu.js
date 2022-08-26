let naviMenu = null;

document.addEventListener('DOMContentLoaded', () => {
    naviMenu = document.querySelector('#naviMenu');
    let buttons = document.querySelectorAll('#buttonCloseMenu, #buttonMenu');
    buttons.forEach(button => button.addEventListener('click', toogleNaviMenu));
});

/**
 * Изменяет видимость меню навигации
 */
function toogleNaviMenu() {
    if (naviMenu !== null) {
        naviMenu.classList.toggle('hidden');
    }
}