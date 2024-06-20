import React, { useState } from 'react';
import Login from './Login'; // Import your Login and Register components
import Register from './Register';
import '../css/auth.css'; // Import your CSS file for Auth component styling

const Auth = () => {
    const [isRegister, setIsRegister] = useState(true);

    return (
        <div className="auth-container">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            {isRegister ? <Register /> : <Login />}
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : 'No account? Register'}
            </button>
        </div>
    );
};

export default Auth;
