const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        let userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user-message';
        userMessageElement.innerHTML = '<p>' + message + '</p>';
        messagesContainer.appendChild(userMessageElement);

        let botMessageElement = document.createElement('div');
        botMessageElement.className = 'message bot-message';
        botMessageElement.innerHTML = '<p class="typing-animation"></p>';
        messagesContainer.appendChild(botMessageElement);

        setTimeout(function () {
            let botResponse = "";
            const lowerCaseMessage = message.toLowerCase();
            
            if (lowerCaseMessage.includes("hello")) {
                botResponse = "Hello there! How can I assist you today?";
            } else if (lowerCaseMessage.includes("how are you?")) {
                botResponse = "I'm functioning optimally, thank you for asking!";
            } else if (lowerCaseMessage.includes("what is your purpose?")) {
                botResponse = "I'm here to provide assistance and answer your questions to the best of my ability.";
            } else if (lowerCaseMessage.includes("thank you")) {
                botResponse = "You're welcome! Feel free to reach out anytime.";
            } else if (lowerCaseMessage.includes("created you") || lowerCaseMessage.includes("made you")) {
                botResponse = "I was created by Imtiaz Shawn.";
            } else if (lowerCaseMessage.includes("help")) {
                botResponse = "Sure! Here are some commands you can try: weather, calculator, timer, reminder, translate, currency conversion, dictionary, random number generator, note-taking, news, timezone conversion, unit conversion, calendar, trivia, jokes, recipe finder, music recommendations, flight information, health tips.";
            } else {
                if (lowerCaseMessage.includes("open youtube") || lowerCaseMessage.includes("youtube open")) {
                    botResponse = "Opening YouTube";
                    window.open("https://youtube.com", "_blank");
                } else if (lowerCaseMessage.includes("open google") || lowerCaseMessage.includes("google open")) {
                    botResponse = "Opening Google";
                    window.open("https://google.com", "_blank");
                } else if (lowerCaseMessage.includes("open wikipedia") || lowerCaseMessage.includes("wikipedia open")) {
                    botResponse = "Opening Wikipedia";
                    window.open("https://en.wikipedia.org", "_blank");
                } else {
                    if (lowerCaseMessage.includes('+') || lowerCaseMessage.includes('-') || lowerCaseMessage.includes('*') || lowerCaseMessage.includes('/')) {
                        let operator;
                        if (lowerCaseMessage.includes('+')) {
                            operator = '+';
                        } else if (lowerCaseMessage.includes('-')) {
                            operator = '-';
                        } else if (lowerCaseMessage.includes('*')) {
                            operator = '*';
                        } else if (lowerCaseMessage.includes('/')) {
                            operator = '/';
                        }
        
                        const numbers = lowerCaseMessage.split(operator);
        
                        const num1 = parseFloat(numbers[0]);
                        const num2 = parseFloat(numbers[1]);
        
                        if (!isNaN(num1) && !isNaN(num2)) {
                            let result;
                            switch (operator) {
                                case '+':
                                    result = num1 + num2;
                                    break;
                                case '-':
                                    result = num1 - num2;
                                    break;
                                case '*':
                                    result = num1 * num2;
                                    break;
                                case '/':
                                    if (num2 !== 0) {
                                        result = num1 / num2;
                                    } else {
                                        botResponse = "Cannot divide by zero.";
                                    }
                                    break;
                            }
                            if (result !== undefined) {
                                botResponse = "The result of the operation is: " + result;
                            }
                        } else {
                            botResponse = "Invalid input. Please provide two valid numbers and an operator (+, -, *, /).";
                        }
                    } else {
                        botResponse = "I'm sorry, I couldn't quite understand that. Could you please rephrase or ask another question?";
                    }
                }
            }
            botMessageElement.innerHTML = '<p>' + botResponse + '</p>';
        }, 1000);

        messageInput.value = '';
    }
}

messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});