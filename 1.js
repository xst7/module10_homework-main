// Получаем ссылку на элементы из DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');
const chatWindow = document.getElementById('chatWindow');

// Функция для создания нового элемента div с заданным классом и текстом
function createMessageElement(className, text) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = text;
  return div;
}

// Обработчик события клика на кнопку "Отправить"
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
  
    // Создаем элемент div с классом "chatQuestion" и текстом сообщения
    const questionElement = createMessageElement('chatQuestion', message);
  
    // Добавляем элемент в chatWindow
    chatWindow.appendChild(questionElement);
  
    // Создаем элемент div с классом "chatAnswer" и текстом автоматического ответа
    const answerElement = createMessageElement('chatAnswer', message);
  
    // Добавляем элемент в chatWindow
    chatWindow.appendChild(answerElement);
  
    // Очищаем поле ввода сообщения
    messageInput.value = '';
  });

// Обработчик события клика на кнопку "Гео-локация"
locationButton.addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`;
  
        // Создаем элемент ссылки и устанавливаем атрибуты href и target
        const linkElement = document.createElement('a');
        linkElement.href = mapUrl;
        linkElement.target = '_blank';
        linkElement.textContent = 'Моя геолокация';
  
        // Создаем элемент div с классом "chatQuestion" и добавляем в него ссылку
        const questionElement = createMessageElement('chatQuestion');
        questionElement.appendChild(linkElement);
  
        // Добавляем элемент в chatWindow
        chatWindow.appendChild(questionElement);
  
        // Прокручиваем chatWindow вниз, чтобы видеть новые сообщения
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    } else {
      console.log('Гео-локация не поддерживается');
    }
  });