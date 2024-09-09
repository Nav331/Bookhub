import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../bookReducer/LoginReducer';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        const { username, password } = state;
        dispatch(loginRequest({ username, password }));
    };

    if (isAuthenticated) {
        navigate('/');
    }

    return (
        <div className='login-page'>
            <div className='App-container'>
                <div className='image-container'>
                    <img src='./images/Rectangle 1467 (2).png' alt='background' />
                </div>
                <div className='login-container'>
                    <div className='logo'>
                        <img src='./images/Group 7731 (1).png' alt='logo' />
                    </div>
                    <div className='container-input'>
                        <form onSubmit={submitForm}>
                            <label htmlFor="username">Username*</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                placeholder='Username'
                                value={state.username}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor="password">Password*</label>
                            <input 
                                type="password"  
                                id="password" 
                                name="password" 
                                placeholder='Password'
                                value={state.password}
                                onChange={onChangeHandler}
                            />
                            <button type='submit' className='btn-sub'>
                                {loading ? 'Loading...' : 'Login'}
                            </button>
                            {error && <p className='error-text'>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
