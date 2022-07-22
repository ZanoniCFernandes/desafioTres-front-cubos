import './style.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axiosInstance from '../../../services/api';

function EditEntry({ token, setShowModal, CategoriesArray, TransactionEditId, setReloadPage }) {

  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [OneTransactionDetail, setOneTransactionDetail] = useState({
    id: '',
    tipo: '',
    descricao: '',
    valor: '',
    data: '',
    usuario_id: '',
    categoria_id: '',
    categoria_nome: '',
  })

  async function getTransactionDetail(TransactionEditId) {

    if (!TransactionEditId) {
      return
    }

    try {

      const { data } = await axiosInstance.get(`/transacao/${TransactionEditId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.valor = (data.valor / 100)

      setOneTransactionDetail({ ...data });
      setReloadPage(false);

    } catch (error) {
      console.log(error.message)
    }
  }


  async function HandleTransactionEdit(TransactionEditId) {

    if (!TransactionEditId) {
      return
    }

    if (!OneTransactionDetail.tipo || !OneTransactionDetail.descricao || !OneTransactionDetail.valor || !OneTransactionDetail.data || !OneTransactionDetail.categoria_id) {
      setError(true);
      setErrorMessage('Por favor, preencha todos os campos!')
      return
    }

    try {

      console.log(OneTransactionDetail.data)

      // OneTransactionDetail.data = new Date(OneTransactionDetail.data);
      OneTransactionDetail.categoria_id = Number(OneTransactionDetail.categoria_id);
      OneTransactionDetail.valor = (OneTransactionDetail.valor).toString().includes(',') ? Number(OneTransactionDetail.valor.replace(',', '.')) * 100 : Number(OneTransactionDetail.valor) * 100;

      console.log(OneTransactionDetail)

      const { data } = await axiosInstance.put(`/transacao/${TransactionEditId}`, { ...OneTransactionDetail }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(data)

    } catch (error) {
      console.log(error.message)
    }
  }


  function handleConfirmAction(event) {
    event.preventDefault()
    HandleTransactionEdit(TransactionEditId)
    setReloadPage(true);
    setShowModal(false)
  }

  useEffect(() => {
    getTransactionDetail(TransactionEditId)
  }, [])

  const hasData = OneTransactionDetail.data &&
    OneTransactionDetail.categoria_nome &&
    OneTransactionDetail.tipo

  return (
    <>
      {hasData &&
        <>
          <div className="title">
            <h3>Editar Registro</h3>
            <h4
              onClick={() => setShowModal(false)}>&times;</h4>
          </div>
          <div className="buttons">
            <button
              onClick={() => setOneTransactionDetail({ ...OneTransactionDetail, tipo: 'entrada' })}
              className={OneTransactionDetail.tipo === 'entrada' ? 'btn active-income' : 'btn inactive'}
            >
              Entrada
            </button>
            <button
              onClick={() => setOneTransactionDetail({ ...OneTransactionDetail, tipo: 'saida' })}
              className={OneTransactionDetail.tipo === 'saida' ? 'btn active-outcome' : 'btn inactive'}
            >
              Saída
            </button>
          </div >
          <div className="entry-form">
            <form>
              <label htmlFor="valueInput">Valor</label>
              <input
                onChange={(event) => setOneTransactionDetail({ ...OneTransactionDetail, valor: event.target.value })}
                type="number"
                name="valueInput"
                required
                value={OneTransactionDetail.valor}
              >
              </input>
              <label htmlFor="categoryInput">Categoria</label>
              <select
                onChange={(event) => setOneTransactionDetail({ ...OneTransactionDetail, categoria_id: event.target.value })}
                required
                defaultValue={OneTransactionDetail.categoria_id}
              >
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
                onChange={(event) => setOneTransactionDetail({ ...OneTransactionDetail, data: event.target.value })}
                type="date"
                name="dateInput"
                required
                defaultValue={format(new Date(OneTransactionDetail.data), 'yyyy-MM-dd')}
              >
              </input>
              <label htmlFor="descriptionInput">Descrição</label>
              <input
                onChange={(event) => setOneTransactionDetail({ ...OneTransactionDetail, descricao: event.target.value })}
                type="text"
                name="descriptionInput"
                required
                value={OneTransactionDetail.descricao}
              >
              </input>
              {Error && <h3 className='error'>{ErrorMessage} </h3>}
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
      }
    </>
  );
}

export default EditEntry;
