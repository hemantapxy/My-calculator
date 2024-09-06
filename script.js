 
        const display = document.querySelector('.display');
        const buttons = document.querySelectorAll('.buttons div');
        const getBtn = document.querySelector('.getBtn')

        let currentInput = '';
        let operator = '';
        let previousInput = '';

        
        function handleButtonClick(event) {
            const value = event.target.textContent;

            if (value === 'AC') {
                
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
                getBtn.innerText = "0";
            } else if (value === 'DEL') {
            
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (['+', '-', '*', '/'].includes(value)) {
                
                if (currentInput) {
                    previousInput = currentInput;
                    operator = value;
                    currentInput = '';
                }
            } else if (value === '=') {
                
                if (previousInput && operator && currentInput) {
                    try {
                        const result = calculateResult(previousInput, operator, currentInput);
                        display.textContent = result;
                        currentInput = result;
                        previousInput = '';
                        operator = '';
                    } catch {
                        display.textContent = 'Error';
                    }
                }
            } else {
            
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                getBtn.innerText = currentInput;
                display.textContent = currentInput;

            }
        }

        
        function calculateResult(prev, op, curr) {
            const num1 = parseFloat(prev);
            const num2 = parseFloat(curr);
            switch (op) {
                case '+': return num1 + num2;
                case '-': return num1 - num2;
                case '*': return num1 * num2;
                case '/': return num2 !== 0 ? num1 / num2 : 'Error';
                default: return 'Error';
               
            }
        }

        
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });