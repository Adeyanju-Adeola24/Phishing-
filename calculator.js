class ClassWizCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.history = document.getElementById('history');
        this.degMode = document.getElementById('deg-mode');
        
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.shiftMode = false;
        this.angleMode = 'DEG'; // DEG, RAD, GRAD
        this.memory = 0;
        this.lastAnswer = 0;
        this.bracketCount = 0;
        this.expression = '';
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.attachEventListeners();
        this.updateModeDisplay();
    }
    
    attachEventListeners() {
        // Number keys
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.number);
            });
        });
        
        // Action keys
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAction(e.target.dataset.action);
            });
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    handleKeyboard(e) {
        e.preventDefault();
        
        if (e.key >= '0' && e.key <= '9') {
            this.inputNumber(e.key);
        } else if (e.key === '.') {
            this.inputDecimal();
        } else if (e.key === '+') {
            this.handleAction('add');
        } else if (e.key === '-') {
            this.handleAction('subtract');
        } else if (e.key === '*') {
            this.handleAction('multiply');
        } else if (e.key === '/') {
            this.handleAction('divide');
        } else if (e.key === 'Enter' || e.key === '=') {
            this.handleAction('equals');
        } else if (e.key === 'Escape') {
            this.handleAction('clear');
        } else if (e.key === 'Backspace') {
            this.backspace();
        } else if (e.key === '(') {
            this.handleAction('brackets');
        } else if (e.key === ')') {
            this.addClosingBracket();
        }
    }
    
    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentInput = num;
            this.waitingForOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }
    
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.expression = '';
        this.bracketCount = 0;
        this.history.textContent = '';
        this.updateDisplay();
    }
    
    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
    
    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'shift':
                this.toggleShift();
                break;
            case 'mode':
                this.cycleAngleMode();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.setOperator(action);
                break;
            case 'sin':
                this.trigFunction('sin');
                break;
            case 'cos':
                this.trigFunction('cos');
                break;
            case 'tan':
                this.trigFunction('tan');
                break;
            case 'log':
                this.logFunction();
                break;
            case 'ln':
                this.lnFunction();
                break;
            case 'square':
                this.squareFunction();
                break;
            case 'reciprocal':
                this.reciprocalFunction();
                break;
            case 'power':
                this.powerFunction();
                break;
            case 'brackets':
                this.handleBrackets();
                break;
            case 'deg':
                this.negateNumber();
                break;
            case 'memory':
                this.handleMemory();
                break;
            case 'exp':
                this.scientificNotation();
                break;
            case 'eng':
                this.backspace();
                break;
            default:
                break;
        }
    }
    
    toggleShift() {
        this.shiftMode = !this.shiftMode;
        const shiftButton = document.querySelector('[data-action="shift"]');
        if (this.shiftMode) {
            shiftButton.classList.add('active');
        } else {
            shiftButton.classList.remove('active');
        }
    }
    
    cycleAngleMode() {
        const modes = ['DEG', 'RAD', 'GRAD'];
        const currentIndex = modes.indexOf(this.angleMode);
        this.angleMode = modes[(currentIndex + 1) % modes.length];
        this.updateModeDisplay();
    }
    
    updateModeDisplay() {
        this.degMode.textContent = this.angleMode;
    }
    
    setOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);
            
            this.currentInput = String(newValue);
            this.previousInput = newValue;
        }
        
        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateHistory();
    }
    
    calculate() {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput !== '' && this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);
            
            this.lastAnswer = newValue;
            this.currentInput = String(newValue);
            this.previousInput = '';
            this.operator = null;
            this.waitingForOperand = true;
            this.updateHistory(`= ${this.formatNumber(newValue)}`);
        }
    }
    
    performCalculation(firstOperand, secondOperand, operator) {
        switch (operator) {
            case 'add':
                return firstOperand + secondOperand;
            case 'subtract':
                return firstOperand - secondOperand;
            case 'multiply':
                return firstOperand * secondOperand;
            case 'divide':
                return secondOperand !== 0 ? firstOperand / secondOperand : 0;
            default:
                return secondOperand;
        }
    }
    
    trigFunction(func) {
        const value = parseFloat(this.currentInput);
        let angleInRadians = value;
        
        // Convert angle based on current mode
        if (this.angleMode === 'DEG') {
            angleInRadians = value * Math.PI / 180;
        } else if (this.angleMode === 'GRAD') {
            angleInRadians = value * Math.PI / 200;
        }
        
        let result;
        if (this.shiftMode) {
            // Inverse trig functions
            switch (func) {
                case 'sin':
                    result = Math.asin(value);
                    break;
                case 'cos':
                    result = Math.acos(value);
                    break;
                case 'tan':
                    result = Math.atan(value);
                    break;
            }
            
            // Convert result back to current angle mode
            if (this.angleMode === 'DEG') {
                result = result * 180 / Math.PI;
            } else if (this.angleMode === 'GRAD') {
                result = result * 200 / Math.PI;
            }
        } else {
            // Normal trig functions
            switch (func) {
                case 'sin':
                    result = Math.sin(angleInRadians);
                    break;
                case 'cos':
                    result = Math.cos(angleInRadians);
                    break;
                case 'tan':
                    result = Math.tan(angleInRadians);
                    break;
            }
        }
        
        this.currentInput = String(this.roundToSignificantFigures(result, 10));
        this.waitingForOperand = true;
        this.updateDisplay();
        this.updateHistory(`${this.shiftMode ? func + '⁻¹' : func}(${value})`);
        this.shiftMode = false;
        this.toggleShift();
    }
    
    logFunction() {
        const value = parseFloat(this.currentInput);
        let result;
        
        if (this.shiftMode) {
            // 10^x
            result = Math.pow(10, value);
            this.updateHistory(`10^${value}`);
        } else {
            // log10
            result = value > 0 ? Math.log10(value) : 0;
            this.updateHistory(`log(${value})`);
        }
        
        this.currentInput = String(this.roundToSignificantFigures(result, 10));
        this.waitingForOperand = true;
        this.updateDisplay();
        this.shiftMode = false;
        this.toggleShift();
    }
    
    lnFunction() {
        const value = parseFloat(this.currentInput);
        let result;
        
        if (this.shiftMode) {
            // e^x
            result = Math.exp(value);
            this.updateHistory(`e^${value}`);
        } else {
            // natural log
            result = value > 0 ? Math.log(value) : 0;
            this.updateHistory(`ln(${value})`);
        }
        
        this.currentInput = String(this.roundToSignificantFigures(result, 10));
        this.waitingForOperand = true;
        this.updateDisplay();
        this.shiftMode = false;
        this.toggleShift();
    }
    
    squareFunction() {
        const value = parseFloat(this.currentInput);
        let result;
        
        if (this.shiftMode) {
            // Square root
            result = value >= 0 ? Math.sqrt(value) : 0;
            this.updateHistory(`√${value}`);
        } else {
            // Square
            result = value * value;
            this.updateHistory(`${value}²`);
        }
        
        this.currentInput = String(this.roundToSignificantFigures(result, 10));
        this.waitingForOperand = true;
        this.updateDisplay();
        this.shiftMode = false;
        this.toggleShift();
    }
    
    reciprocalFunction() {
        const value = parseFloat(this.currentInput);
        let result;
        
        if (this.shiftMode) {
            // Factorial
            result = this.factorial(Math.floor(Math.abs(value)));
            this.updateHistory(`${Math.floor(Math.abs(value))}!`);
        } else {
            // Reciprocal
            result = value !== 0 ? 1 / value : 0;
            this.updateHistory(`1/${value}`);
        }
        
        this.currentInput = String(this.roundToSignificantFigures(result, 10));
        this.waitingForOperand = true;
        this.updateDisplay();
        this.shiftMode = false;
        this.toggleShift();
    }
    
    powerFunction() {
        // This would set up for x^y operation
        this.setOperator('power');
    }
    
    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    negateNumber() {
        if (this.currentInput !== '0') {
            this.currentInput = this.currentInput.startsWith('-') 
                ? this.currentInput.slice(1) 
                : '-' + this.currentInput;
        }
        this.updateDisplay();
    }
    
    handleBrackets() {
        if (this.shiftMode) {
            // Percentage
            const value = parseFloat(this.currentInput);
            this.currentInput = String(value / 100);
            this.updateDisplay();
            this.updateHistory(`${value}%`);
        } else {
            // Brackets - simplified implementation
            if (this.currentInput === '0' || this.waitingForOperand) {
                this.currentInput = '(';
                this.bracketCount++;
            } else {
                this.currentInput += ')';
                this.bracketCount = Math.max(0, this.bracketCount - 1);
            }
            this.updateDisplay();
        }
        this.shiftMode = false;
        this.toggleShift();
    }
    
    handleMemory() {
        if (this.shiftMode) {
            // Store to memory
            this.memory = parseFloat(this.currentInput);
            this.updateHistory(`→M: ${this.currentInput}`);
        } else {
            // Recall from memory
            this.currentInput = String(this.memory);
            this.updateDisplay();
            this.updateHistory(`M: ${this.memory}`);
        }
        this.shiftMode = false;
        this.toggleShift();
    }
    
    scientificNotation() {
        if (this.shiftMode) {
            // Ans (last answer)
            this.currentInput = String(this.lastAnswer);
            this.updateDisplay();
            this.updateHistory(`Ans: ${this.lastAnswer}`);
        } else {
            // Scientific notation (×10^x)
            this.currentInput += 'e';
            this.updateDisplay();
        }
        this.shiftMode = false;
        this.toggleShift();
    }
    
    roundToSignificantFigures(num, figures) {
        if (num === 0) return 0;
        const d = Math.ceil(Math.log10(num < 0 ? -num : num));
        const power = figures - d;
        const magnitude = Math.pow(10, power);
        const shifted = Math.round(num * magnitude);
        return shifted / magnitude;
    }
    
    formatNumber(num) {
        if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }
        return num.toString();
    }
    
    updateDisplay() {
        this.display.textContent = this.formatNumber(parseFloat(this.currentInput)) || '0';
    }
    
    updateHistory(text = '') {
        if (text) {
            this.history.textContent = text;
        } else {
            const operator = this.operator;
            if (operator && this.previousInput !== '') {
                const operatorSymbols = {
                    'add': '+',
                    'subtract': '-',
                    'multiply': '×',
                    'divide': '÷'
                };
                this.history.textContent = `${this.formatNumber(this.previousInput)} ${operatorSymbols[operator]}`;
            }
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ClassWizCalculator();
});

// Add visual feedback for key presses
document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    
    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            key.style.transform = 'translateY(2px)';
            key.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)';
        });
        
        key.addEventListener('mouseup', () => {
            key.style.transform = '';
            key.style.boxShadow = '';
        });
        
        key.addEventListener('mouseleave', () => {
            key.style.transform = '';
            key.style.boxShadow = '';
        });
    });
});