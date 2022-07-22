import { useNavigate } from 'react-router-dom';
import { removeLocalItem } from '../../../utils/localStorage';
import Avatar from '../../../assets/user-prev.svg';
import Exit from '../../../assets/exit.svg';


function ShowHeaderRight({ User, ShowModal, setShowModal, setModalInfo }) {
    const navigate = useNavigate();

    function handleLogout() {
        removeLocalItem('token');
        removeLocalItem('user');
        navigate('/')
    }

    function handleModalInfo(param) {
        setShowModal(!ShowModal)
        setModalInfo(param)
    }

    return (
        <>
            <div className="avatar">
                <img
                    onClick={() => handleModalInfo('edit-user')}
                    src={Avatar}
                    alt="Avatar" />
            </div>
            <h4>{User.nome}</h4>
            <img
                className="exit"
                src={Exit}
                alt="Exit"
                onClick={() => handleLogout()}
            />
        </>
    )
}

export default ShowHeaderRight;