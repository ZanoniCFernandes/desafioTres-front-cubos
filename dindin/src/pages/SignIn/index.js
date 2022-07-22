import './style.css';
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import InstanciaAxios from '../../services/api';
import { useState, useEffect } from 'react';
import { getLocalItem, setLocalItem } from '../../utils/localStorage';

function SignIn() {
  const navigate = useNavigate();
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [UserEmailInput, setUserEmailInput] = useState('');
  const [UserPasswordInput, setUserPasswordInput] = useState('');


  useEffect(() => {
    const token = getLocalItem('token');
    if (token) {
      return navigate('/main')
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();

    if (!UserEmailInput || !UserPasswordInput) {
      setError(true);
      setErrorMessage('Por favor, preencha todos os campos!');
      return
    }

    try {
      const response = await InstanciaAxios.post('/login', { email: UserEmailInput, senha: UserPasswordInput });

      setLocalItem('token', response.data.token);
      // setLocalItem('user', response.data.usuario);

      setUserEmailInput('');
      setUserPasswordInput('');
      setError(false);
      navigate('/main');

    } catch (error) {
      setError(true)
      setErrorMessage(error.message);
    }

  }


  return (
    <div className="container in">
      <Header />
      <div className="in-section">
        <div className="in-hero">
          <div className="in-left">
            <h1>Controle suas <b>finanças</b>, sem planilha chata.</h1>
            <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
            <button
              className="btn sign-up"
              onClick={() => navigate('/sign-up')}
            >
              Cadastre-se</button>
          </div>
          <div className="in-right">
            <div className="in-card">
              <h4>Login</h4>
              <form>
                <label htmlFor="emailInput">E-mail</label>
                <input
                  onChange={(event) => setUserEmailInput(event.target.value)}
                  type="email"
                  name="emailInput"
                  required
                  value={UserEmailInput}
                >
                </input>
                <label htmlFor="passwordInput">Password</label>
                <input
                  onChange={(event) => setUserPasswordInput(event.target.value)}
                  type="password"
                  name="passwordInput"
                  required
                  value={UserPasswordInput}
                >
                </input>
                {Error && <h3 className='error'> {ErrorMessage} </h3>}
                <button
                  className="btn sign-in"
                  type='submit'
                  onClick={(event) => handleSubmit(event)}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default SignIn;
