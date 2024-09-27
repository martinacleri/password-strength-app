import React from 'react';

function PasswordStrength({ password }) {
  const calculateStrength = () => {
    let score = 0;

    if (password.length >= 12) score += 5;
    if (password.length >= 16) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[\W_]/.test(password)) score += 15;

    const repeatedChars = /(.)\1{2,}/.test(password);
    if (repeatedChars) score -= 10;

    if (score === 60) {
      return "muy segura";
    } else if (score >= 30) {
      return "segura";
    } else {
      return "poco segura";
    }
  };

  return (
    <div>
      <p>{password ? `Su contraseña contiene ${password.length} caracteres y es ${calculateStrength()}.` : ''}</p>
    </div>
  );
}

export default PasswordStrength;