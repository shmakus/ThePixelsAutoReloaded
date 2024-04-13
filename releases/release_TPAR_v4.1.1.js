// Функция для проверки и обновления
async function checkAndUpdate() {
  const searchText = "% >";
  const buttonSelector = "[class^=\"BlackButtonStyled-sc\"]"; // Cache selector

  // Функция для клика по кнопке, если доступно
  const clickButton = async () => {
    const buttons = document.querySelectorAll(buttonSelector);
    if (buttons.length > 1) {
      const button = buttons[1];
      if (button && !button.disabled) {
        button.click();
        await wait(5500); // Ожидание для начального текста
        if (!document.body || !document.body.innerText.includes(searchText)) {
          await wait(3700); // Дополнительное ожидание при необходимости
        }
      }
    }
  };

  // Удаление iframe при первом запуске
  const iframes = document.getElementsByTagName("iframe");
  while (iframes.length > 0) {
    iframes[0].parentNode.removeChild(iframes[0]);
  }

  // Начальный клик по кнопке и ожидание
  await clickButton();

  // Периодическая проверка и клик по кнопке
  setInterval(clickButton, 500);
}

// Функция для ожидания определенного времени
function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Подавление всплывающих окон и сообщений в консоли (опционально)
window.alert = () => {};
window.console.log = () => {};

// Дождитесь полной загрузки страницы перед запуском функции checkAndUpdate()
document.addEventListener("DOMContentLoaded", function() {
  checkAndUpdate();
});
