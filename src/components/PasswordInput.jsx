import React from 'react';

function PasswordInput({ password, setPassword, showPassword, setShowPassword }) {
    const maxLength = 64;
    return (
    <div>
      <input
        type={showPassword ? "text" : "password"} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Ingrese su contraseña"
        maxLength={maxLength}
        style={{width: `${Math.max(18, password.length + 1)}ch`}}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Ocultar" : "Mostrar"}
      </button>
      {password.length === maxLength && (<p className='message'>Su contraseña contiene demasiados caracteres.</p>)}
    </div>
  );
}

export default PasswordInput;