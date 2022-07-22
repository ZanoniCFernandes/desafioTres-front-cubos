import './style.css';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstanciaAxios from '../../services/api';
import { getLocalItem } from '../../utils/localStorage/index';

function SignUp() {
  const navigate = useNavigate();

  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  const [UserNameInput, setUserName] = useState('');
  const [UserEmailInput, setUserEmail] = useState('');
  const [UserPasswordInput, setUserPasswordInput] = useState('');
  const [UserRepeatPasswordInput, setUserRepeatPasswordInput] = useState('');

  useEffect(() => {
    const token = getLocalItem('token');
    if (token) {
      return navigate('/main')
    }
  })


  async function handleSubmit(event) {
    event.preventDefault();

    if (!UserNameInput || !UserEmailInput || !UserPasswordInput || !UserRepeatPasswordInput) {
      setError(true);
      setErrorMessage('Por favor, preencha todos os campos!');
      return
    }

    if (UserPasswordInput !== UserRepeatPasswordInput) {
      setError(true);
      setErrorMessage('Senhas não coincidem. Por favor, verifique seus dados!');
      return
    }

    try {
      const response = await InstanciaAxios.post('/usuario', { nome: UserNameInput, email: UserEmailInput, senha: UserPasswordInput })

      setUserName('')
      setUserEmail('')
      setUserPasswordInput('')
      setUserRepeatPasswordInput('')
      setError(false);
      navigate('/sign-in');

    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="container up">
      <Header />
      <div className="up-section">
        <div className="up-card">
          <h4>Cadastre-se</h4>
          <form>
            <label htmlFor="nameInput">Nome</label>
            <input
              onChange={(event) => setUserName(event.target.value)}
              name="nameInput"
              type="text"
              required
              value={UserNameInput}
            >
            </input>
            <label htmlFor="emailInput">E-mail</label>
            <input
              onChange={(event) => setUserEmail(event.target.value)}
              name="emailInput"
              type="email"
              required
              value={UserEmailInput}
            >
            </input>
            <label htmlFor="passwordInput">Senha</label>
            <input
              onChange={(event) => setUserPasswordInput(event.target.value)}
              name="passwordInput"
              type="password"
              required
              value={UserPasswordInput}
            >
            </input>
            <label htmlFor="repeatPasswordInput">Confirmação de senha</label>
            <input
              onChange={(event) => setUserRepeatPasswordInput(event.target.value)}
              name="repeatPasswordInput"
              type="password"
              required
              value={UserRepeatPasswordInput}
            >
            </input>
            {Error && <h3 className='error'> {ErrorMessage} </h3>}
            <button
              className="btn sign"
              type='submit'
              onClick={(event) => handleSubmit(event)}
            >
              Cadastrar
            </button>
          </form>
          <span
            className='existing-user'
            onClick={() => navigate('/sign-in')}>
            Já tem cadastro? Clique aqui!
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
