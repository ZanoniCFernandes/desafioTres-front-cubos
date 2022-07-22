import './style.css';
import TrashIcon from '../../../assets/trash.svg';
import Arrow from '../../../assets/arrow.svg';
import axiosInstance from '../../../services/api';
import { useEffect, useState } from 'react';

function TrashDiv({ token, Transaction, setReloadPage }) {
    const [ShowModalDeleteConfirm, setShowModalDeleteConfirm] = useState(false);

    async function HandleDeleteEntry() {
        try {

            const response = await axiosInstance.delete(`/transacao/${Transaction.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setShowModalDeleteConfirm(!ShowModalDeleteConfirm);
            setReloadPage(true);
        } catch (error) {
            console.log(error)
        }
    }

    function handleModalDelete(target) {
        setShowModalDeleteConfirm(!ShowModalDeleteConfirm)
    }

    return (
        <>
            <div>
                <img
                    id={Transaction.id}
                    onClick={(event) => handleModalDelete(event.target)}
                    src={TrashIcon}
                    alt='Excluir'
                />
            </div>
            {
                ShowModalDeleteConfirm
                &&
                <div className="modal-confirm">
                    <div className='modal-confirm-arrow'>
                        <img src={Arrow} alt="arrow" />
                    </div>
                    <div className="modal-confirm-text">
                        <span>Apagar item?</span>
                    </div>
                    <div className="modal-confirm-buttons">
                        <div
                            onClick={() => HandleDeleteEntry()}
                            className="confirm-yes">
                            <button>
                                Sim
                            </button>
                        </div>
                        <div className="confirm-no">
                            <button onClick={(event) => handleModalDelete(event)}>
                                Não
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default TrashDiv;