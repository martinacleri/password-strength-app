import React, { useState } from 'react';
import PasswordInput from './components/PasswordInput';
import PasswordStrength from './components/PasswordStrength';
import AdvancedOptions from './components/AdvancedOptions';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')

  function generatePassword(length = 16, includeLowercase = true, includeUppercase = true, includeNumbers = true, includeSymbols = true) {
    const lowerCaseChars = includeLowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
    const upperCaseChars = includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    const numberChars = includeNumbers ? '0123456789' : '';
    const symbolChars = includeSymbols ? '!@#$%^&*()_+~`|}{[]:;?><,./-=' : '';
    
    let charSet = lowerCaseChars + upperCaseChars + numberChars + symbolChars;
  
    let newPassword = '';
  
    if (includeLowercase) newPassword += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    if (includeUppercase) newPassword += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    if (includeNumbers) newPassword += numberChars[Math.floor(Math.random() * numberChars.length)];
    if (includeSymbols) newPassword += symbolChars[Math.floor(Math.random() * symbolChars.length)];
  
    for (let i = newPassword.length; i < length; i++) {
      const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
      newPassword += randomChar;
    }
  
    while (/(.)\1{2,}/.test(newPassword)) {
      newPassword = shufflePassword(newPassword);
    }
    setPassword(newPassword);
  }
  
  function shufflePassword(password) {
    return password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setMessage('¡Contraseña copiada!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="App">
      <h1>Fortaleza de Contraseña</h1>
      <PasswordInput 
        password={password} 
        setPassword={setPassword} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} 
      />
      <PasswordStrength password={password} />

      <button onClick={copyToClipboard}>Copiar Contraseña</button>
      {message && <p>{message}</p>}

      <button onClick={() => generatePassword()}>Generar Contraseña Aleatoria</button>

      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? "Ocultar Opciones Avanzadas" : "Mostrar Opciones Avanzadas"}
      </button>

      {showAdvanced && (<AdvancedOptions generatePassword={generatePassword} setError={setError}/>)}

      {error && <p className='message'>{error}</p>}
    </div>
  );
}

export default App;