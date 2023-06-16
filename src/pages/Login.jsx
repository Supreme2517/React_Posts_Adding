import React, { useContext } from 'react'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'

const Login = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/about`);
      }

      
    const { setIsAuth} = useContext(AuthContext);

      const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
      }


  return (
    <div>
        <h1>Страница для логина</h1>

        <form onSubmit={login}>
            <MyInput type="text" placeholder="логин" />
            <MyInput type="password" placeholder="пароль" />
            <MyButton onClick={handleClick}>Войти</MyButton>

        </form>
    </div>
  )
}

export default Login