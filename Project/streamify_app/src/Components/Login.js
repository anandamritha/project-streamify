import React, { useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();

    const[error,setError] = useState('');
    const[message,setMessage] = useState('');

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if(username.trim() === ""){
            newErrors.username = "Please enter user name";
            isValid = false;
        }

        if(password.trim() === ''){
            newErrors.password = "Please enter password";
            isValid = false;
        }

        setError(newErrors);
        return isValid;
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(validateForm){
            try{

                const response = await axios.post("http://localhost:3000/login",{username,password});
                //console.log(response);
                //setMessage('Login successful ');
                //alert('success');
               navigate('/movies');
            }
            catch(error){
                setError(error.response.data.message);
            }
        }
    };

    const handleFocus = () => {
        setError('');
        setMessage('')
    }

    return(
        <div>
            
            <form onSubmit={handleSubmit} noValidate>
                <div className='container'>
                <h5>Log-in</h5>
                    <div className='mb-3'>
                        UserName: <input type="text" className='form-control' value={username} onFocus={handleFocus}
                            onChange={(e) => { setUsername(e.target.value) }}
                            required />
                        {error && <p className='error'>{error.username}</p>}
                    </div>

                    <div className='mb-3'>
                        Password: <input type="password" className='form-control' value={password} onFocus={handleFocus}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required />
                        {error && <p className='error'>{error.password}</p>}
                    </div>

                    <button type="submit" className = 'btn btn-primary'>Login</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {message && <div style={{ color: 'green' }}>{message}</div>}
                </div>
            </form>
        </div>
    )
}

export default LoginForm;