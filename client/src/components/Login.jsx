import React, { useState } from 'react'
import Construccion from './Construccion';

const Login = () => {
    const [darkMode, setDarkMode] = useState();
    return (
        <div>login
            <Construccion/>
        </div>
    )
}

export default Login