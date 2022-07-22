import './style.css';
import { useState } from 'react';
import axiosInstance from '../../../services/api';
import { getLocalItem } from '../../../utils/localStorage';

function AddEntry({ setShowModal, CategoriesArray, setReloadPage }) {
  const token = getLocalItem('token');
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [Entry, setEntry] = useState({
    descricao: '',
    valor: '',
    data: '',
    categoria_id: '',
    tipo: 'saida',
  })

  async function handleConfirmAction(event) {
    event.preventDefault()

    if (!Entry.categoria_id || !Entry.data || !Entry.descricao || !Entry.tipo || !Entry.valor) {
      setError(true)
      setErrorMessage('Por favor, preencha todos os campos!')
      return
    }

    try {
      const TreatedEntry = { ...Entry }
      TreatedEntry.data = new Date(TreatedEntry.data);
      TreatedEntry.categoria_id = Number(TreatedEntry.categoria_id);
      TreatedEntry.valor = Number(TreatedEntry.valor.replace(',', '.')) * 100;

      const response = await axiosInstance.post('/transacao', { ...TreatedEntry }, { headers: { Authorization: `Bearer ${token}` } });

      setError(false);
      setShowModal(false);
      setEntry({
        descricao: '',
        valor: '',
        data: '',
        categoria_id: '',
        tipo: 'saida',
      })
      setReloadPage(true);

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <>
      <div className="title">
        <h3>Adicionar Registro</h3>
        <h4
          onClick={() => setShowModal(false)}>&times;</h4>
      </div>
      <div className="buttons">
        <button
          onClick={() => setEntry({ ...Entry, tipo: 'entrada' })}
          className={Entry.tipo === 'entrada' ? 'btn active-income' : 'btn inactive'}>
          Entrada
        </button>
        <button
          onClick={() => setEntry({ ...Entry, tipo: 'saida' })}
          className={Entry.tipo === 'saida' ? 'btn active-outcome' : 'btn inactive'}>
          Saída
        </button>
      </div>
      <div className="entry-form">
        <form>
          <label htmlFor="valueInput">Valor</label>
          <input
            onChange={(event) => setEntry({ ...Entry, valor: event.target.value })}
            type="number"
            name="valueInput"
            required
            value={Entry.valor}
          >
          </input>
          <label htmlFor="categoryInput">Categoria</label>
          <select
            onChange={(event) => setEntry({ ...Entry, categoria_id: event.target.value })}
            required
          >
            <option
              value={null}>
            </option>
            {CategoriesArray.map((Category) => {
              return (
                <option
                  value={Category.id}
                  key={Category.id}>
                  {Category.descricao}
                </option>
              )
            })}
          </select>
          <label htmlFor="dateInput">Data</label>
          <input
            onChange={(event) => setEntry({ ...Entry, data: event.target.value })}
            type="date"
            name="dateInput"
            required
            value={Entry.data}
          >
          </input><label htmlFor="descriptionInput">Descrição</label>
          <input
            onChange={(event) => setEntry({ ...Entry, descricao: event.target.value })}
            type="text"
            name="descriptionInput"
            required
            value={Entry.descricao}
          >
          </input>
          {Error && <h3 className='error'>{ErrorMessage} </h3>}
          <div className="btn-confirm">
            <button
              type='submit'
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

export default AddEntry;
