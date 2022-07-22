import './style.css';
import Header from '../../components/header';
import Bar from '../../components/bar';
import Sumary from '../../components/sumary';
import Entry from '../../components/entries';
import FilterModal from '../../components/filter';
import ModalBox from '../../components/modals/modal-box';
import axiosInstance from '../../services/api';
import Filter from '../../assets/filter.svg';
import { getLocalItem } from '../../utils/localStorage/index';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Main() {
  const navigate = useNavigate();
  const token = getLocalItem('token');
  const [ReloadPage, setReloadPage] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [ModalInfo, setModalInfo] = useState(null);
  const [AscOrderState, setAscOrderState] = useState(true);
  const [ShowModalFilter, setShowModalFilter] = useState(false);
  const [User, setUser] = useState({ id: '', nome: '', email: '' });
  const [TransactionEditId, setTransactionEditId] = useState(null);
  const [CategoriesArray, setCategoriesArray] = useState([{ id: '', descricao: '' },]);


  async function GetUserInfo() {
    try {
      const { data } = await axiosInstance.get('/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser({ ...User, ...data })
      setReloadPage(false);

    } catch (error) {
      console.log(error.message)
    }
  }

  async function GetCategoriesInfo() {

    try {
      const { data } = await axiosInstance.get('/categoria', { headers: { Authorization: `Bearer ${token}` } });
      setCategoriesArray(data)
      setReloadPage(false);

    } catch (error) {
      console.log(error.message)
    }
  }

  function handleModalInfo(param) {
    setShowModal(!ShowModal)
    setModalInfo(param)
  }


  useEffect(() => {
    if (!token) {
      return navigate('/')
    }
    GetUserInfo()
    GetCategoriesInfo()
  }, []);


  useEffect(() => {
    if (!ReloadPage) {
      return
    }
    return navigate('/')
  }, [ReloadPage])


  return (
    <div className="container main">
      <Header
        User={User}
        ShowModal={ShowModal}
        setShowModal={setShowModal}
        setModalInfo={setModalInfo}
        setReloadPage={setReloadPage}
      />
      <div className="main-section">
        <div className="main-hero">
          <div className="hero-left">
            <div className='filter'>
              <div
                onClick={() => setShowModalFilter(!ShowModalFilter)}
                className='filter-button'>
                <img src={Filter} alt='Filter icon' />
                <h4>Filtrar</h4>
              </div>
              <div className='filter-modal'>
                {ShowModalFilter
                  &&
                  <FilterModal
                    CategoriesArray={CategoriesArray}
                  />}
              </div>
            </div>
            <Bar
              AscOrderState={AscOrderState}
              setAscOrderState={setAscOrderState}
            />
            <div className="entry">
              <Entry
                AscOrderState={AscOrderState}
                ReloadPage={ReloadPage}
                setReloadPage={setReloadPage}
                ShowModal={ShowModal}
                setShowModal={setShowModal}
                setModalInfo={setModalInfo}
                setTransactionEditId={setTransactionEditId}
              />
            </div>
          </div>
          <div className="hero-right">
            <Sumary
              setReloadPage={setReloadPage} />
            <button
              className='btn add-entry'
              onClick={() => handleModalInfo('add-entry')}
            >
              Adicionar Registro
            </button>
          </div>
        </div>
      </div>
      {
        ShowModal &&
        <ModalBox
          User={User}
          CategoriesArray={CategoriesArray}
          setShowModal={setShowModal}
          ModalInfo={ModalInfo}
          TransactionEditId={TransactionEditId}
          setReloadPage={setReloadPage}
        />
      }
    </div >
  );
}

export default Main;
