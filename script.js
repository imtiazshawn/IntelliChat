const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

function createUserMessage(message) {
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user-message';
    userMessageElement.innerHTML = '<p>' + message + '</p>';
    messagesContainer.appendChild(userMessageElement);
}

function createBotMessage() {
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'message bot-message';
    const typingAnimation = document.createElement('p');
    typingAnimation.className = 'typing-animation';
    botMessageElement.appendChild(typingAnimation);
    messagesContainer.appendChild(botMessageElement);
    return botMessageElement;
}

function displayBotResponse(botMessageElement, botResponse) {
    const typingAnimation = botMessageElement.querySelector('.typing-animation');
    botMessageElement.removeChild(typingAnimation);
    const responseParagraph = document.createElement('p');
    responseParagraph.textContent = botResponse;
    botMessageElement.appendChild(responseParagraph);
}

function handleNormalCommand(message, botMessageElement) {
    let botResponse = "";

    if (message.toLowerCase().includes("help")) {
        botResponse = "Sure! Here are some commands you can try: weather, calculator, timer, reminder, translate, currency conversion, dictionary, random number generator, note-taking, news, timezone conversion, unit conversion, calendar, trivia, jokes, recipe finder, music recommendations, flight information, health tips.";
    } else {
        botResponse = "I'm sorry, I couldn't quite understand that. Could you please rephrase or ask another question?";
    }

    displayBotResponse(botMessageElement, botResponse);
}

function handleFunctionalCommand(message, botMessageElement) {
    let botResponse = "";

    if (message.toLowerCase().includes("hello")) {
        botResponse = "Hello there! How can I assist you today?";
    } else if (message.toLowerCase().includes("how are you?")) {
        botResponse = "I'm functioning optimally, thank you for asking!";
    } else if (message.toLowerCase().includes("what is your purpose?")) {
        botResponse = "I'm here to provide assistance and answer your questions to the best of my ability.";
    } else if (message.toLowerCase().includes("thank you")) {
        botResponse = "You're welcome! Feel free to reach out anytime.";
    } else if (message.toLowerCase().includes("created you") || message.toLowerCase().includes("made you")) {
        botResponse = "I was created by Imtiaz Shawn.";
    } else {
        handleNormalCommand(message, botMessageElement);
    }

    displayBotResponse(botMessageElement, botResponse);
}

function handleUsefulCommand(message, botMessageElement) {
    let botResponse = "";

    if (message.toLowerCase().includes("open youtube") || message.toLowerCase().includes("youtube open")) {
        botResponse = "Opening YouTube";
        window.open("https://youtube.com", "_blank");
    } else if (message.toLowerCase().includes("open google") || message.toLowerCase().includes("google open")) {
        botResponse = "Opening Google";
        window.open("https://google.com", "_blank");
    } else if (message.toLowerCase().includes("open wikipedia") || message.toLowerCase().includes("wikipedia open")) {
        botResponse = "Opening Wikipedia";
        window.open("https://en.wikipedia.org", "_blank");
    } else {
        handleFunctionalCommand(message, botMessageElement);
    }
    
    displayBotResponse(botMessageElement, botResponse);
}

function handleMathCalculation(message, botMessageElement) {
    let botResponse = "";

    const mathExpression = message.toLowerCase();
    const operators = ['+', '-', '*', '/'];

    let operatorFound = false;
    for (let i = 0; i < operators.length; i++) {
        if (mathExpression.includes(operators[i])) {
            operatorFound = true;
            break;
        }
    }

    if (operatorFound) {
        try {
            const result = eval(mathExpression);
            botResponse = "The result of the operation is: " + result;
        } catch (error) {
            botResponse = "Invalid expression. Please provide a valid mathematical expression.";
        }
    } else {
        botResponse = "Invalid input. Please provide a valid mathematical expression.";
    }

    displayBotResponse(botMessageElement, botResponse);
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        createUserMessage(message);
        const botMessageElement = createBotMessage();
        setTimeout(function () {
            if (message.match(/^[+\-*/0-9.\s]+$/)) {
                handleMathCalculation(message, botMessageElement);
            } else {
                handleUsefulCommand(message, botMessageElement);
            }
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
