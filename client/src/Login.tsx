import { useState } from 'react';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Lógica de autenticación intacta
    if (email === 'admin@complejo.com' && password === 'admin123') {
      onLogin();
    } else {
      setError('Credenciales incorrectas');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      {/* Efectos visuales de fondo */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>

      <div className="login-card">
        <div className="login-header">
          {/* Icono de Cancha de Fútbol/Deportiva */}
          <div className="logo-icon">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="3" x2="12" y2="21"></line>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M2 12h3"></path>
              <path d="M19 12h3"></path>
            </svg>
          </div>
          <h1>SportManager <span>PRO</span></h1>
          <p>Gestión de Complejos Deportivos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-box">
            <input 
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-box">
            <input 
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-login">
            INICIAR SESIÓN
          </button>
        </form>

        <div className="login-footer">
          <p>CREDENCIALES DE ACCESO:</p>
          <code>admin@complejo.com | admin123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;