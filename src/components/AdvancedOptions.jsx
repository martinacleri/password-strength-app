import React, { useState , useEffect } from 'react';

function AdvancedOptions({ generatePassword, setError }) {
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      setError('Debe seleccionar al menos una opción para generar una contraseña.');
      setButtonDisabled(true);
    } else {
      setError('');
      setButtonDisabled(false);
    }
  }, [includeLowercase, includeUppercase, includeNumbers, includeSymbols, setError]);

  const handleGenerate = () => {
    generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
  };

  return (
    <div className="advancedOptions">
      <h3>Opciones avanzadas para generar contraseña</h3>
      <label>
        Cantidad de caracteres 
        <input
          type="number" 
          value={length} 
          onChange={(e) => setLength(Number(e.target.value))}
          min="8" 
          max="64"
        />
      </label>

      <label>
        <input 
          type="checkbox" 
          checked={includeLowercase} 
          onChange={() => setIncludeLowercase(!includeLowercase)} 
        /> 
        Incluir minúsculas
      </label>

      <label>
        <input 
          type="checkbox" 
          checked={includeUppercase} 
          onChange={() => setIncludeUppercase(!includeUppercase)} 
        /> 
        Incluir mayúsculas
      </label>

      <label>
        <input 
          type="checkbox" 
          checked={includeNumbers} 
          onChange={() => setIncludeNumbers(!includeNumbers)} 
        /> 
        Incluir números
      </label>

      <label>
        <input 
          type="checkbox" 
          checked={includeSymbols} 
          onChange={() => setIncludeSymbols(!includeSymbols)} 
        /> 
        Incluir símbolos
      </label>

      <button onClick={handleGenerate} disabled={buttonDisabled}>Generar Contraseña</button>
    </div>
  );
}

export default AdvancedOptions;