let resultText;
let resetButton;
let negateButton;
let percentButtonn;
let divideButton;
let sevenButton;
let eightButton;
let nineButton;
let multiplyButtonon;
let fourButton;
let fiveButton;
let sixButton;
let subtractButtonon;
let oneButton;
let twoButton;
let threeButton;
let addButton;
let zeroButton;
let commaButton;
let getResultButtontton;

let notificationReminderButton;

let currentDisplayedValue = '0';
let firstNumberForCalculation = 0;
let secondNumberForCalculation;
let calculationResult = 0;
let currentOperator;

function initElements() {
    resultText = document.getElementById('result-text');
    resetButton = document.getElementById('reset-button');  
    negateButton = document.getElementById('negate-button');
    percentButton = document.getElementById('percent-button');
    divideButton = document.getElementById('divide-button');
    sevenButton = document.getElementById('seven-button');
    eightButton = document.getElementById('eight-button');
    nineButton = document.getElementById('nine-button');
    multiplyButton = document.getElementById('multiply-button');
    fourButton = document.getElementById('four-button');
    fiveButton = document.getElementById('five-button');
    sixButton = document.getElementById('six-button');
    subtractButton = document.getElementById('subtract-button');
    oneButton = document.getElementById('one-button');
    twoButton = document.getElementById('two-button');
    threeButton = document.getElementById('three-button');
    addButton = document.getElementById('add-button');
    zeroButton = document.getElementById('zero-button');
    commaButton = document.getElementById('comma-button');
    getResultButton = document.getElementById('get-result-button');
    notificationReminderButton = document.getElementById('notification-button');
}

function updateDisplayedResult() {
    let displayedResultText = currentDisplayedValue.replace('.', ',');
    resultText.textContent = displayedResultText;
}

function resetActiveOperator() {
    currentOperator = undefined;
    const allOperatoreInstances = [
        divideButton,
        multiplyButton,
        subtractButton,
        addButton
    ]
    allOperatoreInstances.forEach(operatorInstance => {
        operatorInstance.className = 'key purple';
    });
}

function updateCalculationValue(numberAsString, calculatePercent = false) {
    if (firstNumberForCalculation || currentDisplayedValue === '0' || calculatePercent || currentOperator) {
        currentDisplayedValue = numberAsString;
    } else {
        currentDisplayedValue += numberAsString;
    }
    updateDisplayedResult();
}

function setFirstNumberForCalculation(numberAsString) {
    const indexOfComma = numberAsString.indexOf(',');
    if (indexOfComma === -1) {
        firstNumberForCalculation = Number(numberAsString);
        return;
    }
    const numberAsDecimal = numberAsString.replace(',', '.');
    firstNumberForCalculation = Number(numberAsDecimal);
} 

function setOperator(oberatoreAsString) {
    currentOperator = oberatoreAsString;
}

function randomNotifictaion() {
    const notifTitle = 'This is your random test notification';
    const notifBody = 'I have nothing to say, just that I wanted to notify you.';
    const notifImg = './images/icons/icon-512x512.png';
    const options = {
        body: notifBody,
        icon: notifImg,
    };
    new Notification(notifTitle, options);
    setTimeout(randomNotifictaion, 5000);
}

function setEventListener() {
    resetButton.addEventListener('click', () => {
        currentDisplayedValue = '0';
        firstNumberForCalculation = undefined;
        resetActiveOperator();
        updateDisplayedResult();
    });
    
    negateButton.addEventListener('click', () => {
        currentDisplayedValue = String(-1 * Number(currentDisplayedValue));
        updateDisplayedResult();
    });
    
    percentButton.addEventListener('click', () => {
        const numberAsNumber = Number(currentDisplayedValue);
        const inPercent = String(numberAsNumber / 100);
        updateCalculationValue(inPercent, true);
    });
    
    divideButton.addEventListener('click', () => {
        setFirstNumberForCalculation(currentDisplayedValue);
        resetActiveOperator();
        setOperator('/');
        divideButton.className = 'key active';
    });
    
    sevenButton.addEventListener('click', () => {
        updateCalculationValue('7');
    });
    
    eightButton.addEventListener('click', () => {
        updateCalculationValue('8');
    });
    
    nineButton.addEventListener('click', () => {
        updateCalculationValue('9');
    });
    
    multiplyButton.addEventListener('click', () => {
        setFirstNumberForCalculation(currentDisplayedValue);
        resetActiveOperator();
        setOperator('x');
        multiplyButton.className = 'key active';
    });
    
    fourButton.addEventListener('click', () => {
        updateCalculationValue('4');
    });
    
    fiveButton.addEventListener('click', () => {
        updateCalculationValue('5');
    });
    
    sixButton.addEventListener('click', () => {
        updateCalculationValue('6');
    });
    
    subtractButton.addEventListener('click', () => {
        setFirstNumberForCalculation(currentDisplayedValue);
        resetActiveOperator();
        setOperator('-');
        subtractButton.className = 'key active';
    });
    
    oneButton.addEventListener('click', () => {
        updateCalculationValue('1');
    });
    
    twoButton.addEventListener('click', () => {
        updateCalculationValue('2');
    });
    
    threeButton.addEventListener('click', () => {
        updateCalculationValue('3');
    });
    
    addButton.addEventListener('click', () => {
        setFirstNumberForCalculation(currentDisplayedValue);
        resetActiveOperator();
        setOperator('+');
        addButton.className = 'key active';
    });
    
    zeroButton.addEventListener('click', () => {
        updateCalculationValue('0');
    });
    
    commaButton.addEventListener('click', () => {
        const indexOfComma = currentDisplayedValue.indexOf(',');
        if(indexOfComma === -1) {
            currentDisplayedValue += ',';
            updateDisplayedResult();
        }
    });
    
    getResultButton.addEventListener('click', () => {
        debugger;
        if (firstNumberForCalculation) {
            secondNumberForCalculation = Number(currentDisplayedValue);

            switch (currentOperator) {
                case '/':
                    calculationResult = Number(firstNumberForCalculation) / Number(secondNumberForCalculation);
                    break;
                case 'x':
                    calculationResult = Number(firstNumberForCalculation) * Number(secondNumberForCalculation);
                    break
                case '-':
                    calculationResult = Number(firstNumberForCalculation) - Number(secondNumberForCalculation);
                    break;
                case '+':
                    calculationResult = Number(firstNumberForCalculation) + Number(secondNumberForCalculation);
            }
            currentDisplayedValue = String(calculationResult);
            resetActiveOperator();
            updateDisplayedResult();
        }
    });

    notificationReminderButton.addEventListener('click', () => {
        Notification.requestPermission().then((result) => {
            if(result === 'granted') {
                randomNotifictaion();
            }
        })
    })
}

function startApp() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceworker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
        })
    }
    initElements();
    setEventListener();
}

startApp();







