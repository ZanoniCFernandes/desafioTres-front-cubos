import './style.css';
import axiosInstance from '../../services/api';
import EditIcon from '../../assets/edit.svg';
import TrashDiv from './trash';
import { getLocalItem } from '../../utils/localStorage/index';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Entry({ AscOrderState, ReloadPage, setReloadPage, ShowModal, setShowModal, setModalInfo, setTransactionEditId, }) {
    const token = getLocalItem('token');
    const [TransactionsList, setTransactionsList] = useState([
        {
            id: '',
            tipo: '',
            descricao: '',
            valor: '',
            data: '',
            usuario_id: '',
            categoria_id: '',
            categoria_nome: '',
        }
    ]);

    async function GetTransactionsInfo() {
        try {
            const { data } = await axiosInstance.get('/transacao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const OrderedList = data;

            if (AscOrderState === true) {
                OrderedList.sort(function (a, b) { return new Date(b.data) - new Date(a.data) })
            } else {
                OrderedList.sort(function (a, b) { return new Date(a.data) - new Date(b.data) });
            }

            setTransactionsList(OrderedList);
            setReloadPage(false);

        } catch (error) {
            console.log(error.message)
        }
    }

    function TreatValueData(value) {
        const Entry = (value).toString().split('');
        Entry.splice(-2, 0, ',');
        const Result = Entry.join('');
        return Result;
    }

    function TreatDateData(value) {
        const DayOfWeek = Number(format(parseISO(value), 'i'));

        if (DayOfWeek === 1) {
            return 'Segunda'
        } else if (DayOfWeek === 2) {
            return 'Terça'
        } else if (DayOfWeek === 3) {
            return 'Quarta'
        } else if (DayOfWeek === 4) {
            return 'Quinta'
        } else if (DayOfWeek === 5) {
            return 'Sexta'
        } else if (DayOfWeek === 6) {
            return 'Sábado'
        } else if (DayOfWeek === 7) {
            return 'Domingo'
        }
    }


    function handleModalInfo(ModalParam, TransactionId) {
        setShowModal(!ShowModal)
        setModalInfo(ModalParam)
        setTransactionEditId(TransactionId);
    }


    useEffect(() => {
        GetTransactionsInfo()
    }, []);

    useEffect(() => {
        if (!ReloadPage) {
            return
        }
        GetTransactionsInfo()
    }, [ReloadPage]);

    useEffect(() => {
        GetTransactionsInfo()
    }, [AscOrderState]);


    return (
        <>
            {TransactionsList.map((Transaction) => {
                return (
                    <div
                        key={Transaction.id}
                        className='one-entry'>
                        <div className="space">
                            {Transaction.data && <h4><b>{format(parseISO(Transaction.data), 'dd/MM/yy', { locale: ptBR })}</b></h4>}
                        </div >
                        <div className="space">
                            {Transaction.data && <h4>{TreatDateData(Transaction.data)}</h4>}
                        </div>
                        <div className="space">
                            <h4>{Transaction.descricao}</h4>
                        </div>
                        <div className="space">
                            <h4>{Transaction.categoria_nome}</h4>
                        </div>
                        <div className="space">
                            <strong
                                className={Transaction.tipo === 'entrada' ? 'income' : 'outcome'}>
                                R${TreatValueData(Transaction.valor)}
                            </strong>
                        </div>
                        <div className="space">
                            <div className="icons">
                                <img
                                    onClick={() => handleModalInfo('edit-entry', Transaction.id)}
                                    src={EditIcon}
                                    alt='Editar'
                                />
                                <TrashDiv
                                    setReloadPage={setReloadPage}
                                    token={token}
                                    Transaction={Transaction} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Entry;