import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import './EngineeringCalculator.css';

const EngineeringCalculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [isRad, setIsRad] = useState(true);

  // Helper function to run the math evaluation engine
  const evaluateFormula = (currentDisplay, currentMode) => {
    if (!currentDisplay) {
      setResult('');
      return;
    }
    try {
      let expression = currentDisplay;

      // Handle trigonometry conversion if the calculator is set to Degrees (DEG)
      if (!currentMode) {
        expression = expression.replace(/sin\((.*?)\)/g, 'sin($1 deg)');
        expression = expression.replace(/cos\((.*?)\)/g, 'cos($1 deg)');
        expression = expression.replace(/tan\((.*?)\)/g, 'tan($1 deg)');
      }

      const evaluated = math.evaluate(expression);
      setResult(math.format(evaluated, { precision: 14 }));
    } catch (error) {
      // Quietly handle incomplete formulas while typing
    }
  };

  // Automatically re-evaluate when shifting between RAD and DEG
  useEffect(() => {
    evaluateFormula(display, isRad);
  }, [isRad]); 

  const appendValue = (val) => {
    setDisplay((prev) => prev + val);
  };

  const clearAll = () => {
    setDisplay('');
    setResult('');
  };

  const deleteLast = () => {
    const updatedDisplay = display.slice(0, -1);
    setDisplay(updatedDisplay);
    evaluateFormula(updatedDisplay, isRad);
  };

  const handleEquals = () => {
    try {
      let expression = display;
      if (!isRad) {
        expression = expression.replace(/sin\((.*?)\)/g, 'sin($1 deg)');
        expression = expression.replace(/cos\((.*?)\)/g, 'cos($1 deg)');
        expression = expression.replace(/tan\((.*?)\)/g, 'tan($1 deg)');
      }
      const evaluated = math.evaluate(expression);
      setResult(math.format(evaluated, { precision: 14 }));
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator-container">
      {/* Screen Panel */}
      <div className="screen">
        <div className="mode-indicator">{isRad ? 'RAD' : 'DEG'}</div>
        <div className="formula-display">{display || '0'}</div>
        <div className="result-display">{result}</div>
      </div>

      {/* Primary Actions Row */}
      <div className="control-row">
        <button className="btn btn-toggle" onClick={() => setIsRad(!isRad)}>
          {isRad ? 'Switch to DEG' : 'Switch to RAD'}
        </button>
        <button className="btn btn-clear" onClick={clearAll}>AC</button>
        <button className="btn btn-action" onClick={deleteLast}>DEL</button>
      </div>

      {/* Grid Keyboard Layout (Now 5 Columns Wide) */}
      <div className="keypad">
        {/* Row 1: Hyperbolics & Extras */}
        <button className="btn btn-sci" onClick={() => appendValue('sinh(')}>sinh</button>
        <button className="btn btn-sci" onClick={() => appendValue('cosh(')}>cosh</button>
        <button className="btn btn-sci" onClick={() => appendValue('tanh(')}>tanh</button>
        <button className="btn btn-sci" onClick={() => appendValue('abs(')}>abs</button>
        <button className="btn btn-operator" onClick={() => appendValue('%')}>%</button>

        {/* Row 2: Standard Scientifics */}
        <button className="btn btn-sci" onClick={() => appendValue('sin(')}>sin</button>
        <button className="btn btn-sci" onClick={() => appendValue('cos(')}>cos</button>
        <button className="btn btn-sci" onClick={() => appendValue('tan(')}>tan</button>
        <button className="btn btn-sci" onClick={() => appendValue('log(')}>log</button>
        <button className="btn btn-operator" onClick={() => appendValue('!')}>x!</button>
        
        {/* Row 3: Standard Scientifics Continued */}
        <button className="btn btn-sci" onClick={() => appendValue('ln(')}>ln</button>
        <button className="btn btn-sci" onClick={() => appendValue('^')}>xʸ</button>
        <button className="btn btn-sci" onClick={() => appendValue('sqrt(')}>√</button>
        <button className="btn btn-sci" onClick={() => appendValue('pi')}>π</button>
        <button className="btn btn-operator" onClick={() => appendValue('/')}>÷</button>
        
        {/* Row 4: Numbers and Parentheses */}
        <button className="btn btn-sci" onClick={() => appendValue('(')}>(</button>
        <button className="btn" onClick={() => appendValue('7')}>7</button>
        <button className="btn" onClick={() => appendValue('8')}>8</button>
        <button className="btn" onClick={() => appendValue('9')}>9</button>
        <button className="btn btn-operator" onClick={() => appendValue('*')}>×</button>

        {/* Row 5: Numbers and Constants */}
        <button className="btn btn-sci" onClick={() => appendValue(')')}>)</button>
        <button className="btn" onClick={() => appendValue('4')}>4</button>
        <button className="btn" onClick={() => appendValue('5')}>5</button>
        <button className="btn" onClick={() => appendValue('6')}>6</button>
        <button className="btn btn-operator" onClick={() => appendValue('-')}>-</button>

        {/* Row 6: Numbers and Imaginary */}
        <button className="btn btn-sci" onClick={() => appendValue('i')}>i</button>
        <button className="btn" onClick={() => appendValue('1')}>1</button>
        <button className="btn" onClick={() => appendValue('2')}>2</button>
        <button className="btn" onClick={() => appendValue('3')}>3</button>
        <button className="btn btn-operator" onClick={() => appendValue('+')}>+</button>

        {/* Row 7: Base options */}
        <button className="btn btn-sci" onClick={() => appendValue('e')}>e</button>
        <button className="btn btn-sci" onClick={() => appendValue('random()')}>rand</button>
        <button className="btn" onClick={() => appendValue('0')}>0</button>
        <button className="btn" onClick={() => appendValue('.')}>.</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};
export default EngineeringCalculator;