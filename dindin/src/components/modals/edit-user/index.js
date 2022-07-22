import './style.css';
import { useState } from 'react';
import axiosInstance from '../../../services/api';

function EditUser({ User, setShowModal, token, setReloadPage }) {
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [RepeatPasswordInput, setRepeatPasswordInput] = useState('');
  const [NewUserInfo, setNewUserInfo] = useState({ nome: `${User.nome}`, email: `${User.email}`, senha: '' })

  async function handleConfirmAction(event) {
    event.preventDefault()

    if (!NewUserInfo.nome || !NewUserInfo.email || !NewUserInfo.senha || !RepeatPasswordInput) {
      setError(true);
      setErrorMessage('Por favor, preencha todos os campos!')
      return
    }

    if (NewUserInfo.senha !== RepeatPasswordInput) {
      setError(true);
      setErrorMessage('Senhas não conferem. Por favor, confira seus dados!')
      return
    }

    try {

      const response = await axiosInstance.put('/usuario', {
        ...NewUserInfo
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setError(false);
      setErrorMessage('');
      setShowModal(false);
      setReloadPage(true);

    } catch (error) {
      setError(true);
      setErrorMessage(error.message)
    }

  }

  return (
    <>
      <div className="title">
        <h3>Editar Perfil</h3>
        <h4
          onClick={() => setShowModal(false)}>&times;</h4>
      </div>
      <div className="entry-form">
        <form>
          <label htmlFor="nameInput">Nome</label>
          <input
            onChange={(event) => setNewUserInfo({ ...NewUserInfo, nome: event.target.value })}
            type="text"
            name="nameInput"
            required
            value={NewUserInfo.nome}
          >
          </input>
          <label htmlFor="emailInput">E-mail</label>
          <input
            onChange={(event) => setNewUserInfo({ ...NewUserInfo, email: event.target.value })}
            type="text"
            name="emailInput"
            required
            value={NewUserInfo.email}
          >
          </input>
          <label htmlFor="passwordInput">Senha</label>
          <input
            onChange={(event) => setNewUserInfo({ ...NewUserInfo, senha: event.target.value })}
            type="password"
            name="passwordInput"
            required
            value={NewUserInfo.senha}
          >
          </input>
          <label htmlFor="passwordRepeatInput">Confirmação de senha</label>
          <input
            onChange={(event) => setRepeatPasswordInput(event.target.value)}
            type="password"
            name="passwordRepeatInput"
            required
            value={RepeatPasswordInput}
          >
          </input>
          {Error && <h3 className='error'> {ErrorMessage} </h3>}
          <div className="btn-confirm">
            <button
              onClick={(event) => handleConfirmAction(event)}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUser;
