import './style.css';
import Logo from '../../assets/logo.svg';
import ShowHeaderRight from './headerRight/index';

function Header({ User, ShowModal, setShowModal, setModalInfo }) {

    return (
        <div className='container-header'>
            <div className='header-left'>
                <img className='logo' src={Logo} alt="Dindin Logo" />
            </div>
            <div className='header-right'>
                {
                    User &&
                    <ShowHeaderRight
                        User={User}
                        ShowModal={ShowModal}
                        setShowModal={setShowModal}
                        setModalInfo={setModalInfo}
                    />
                }
            </div>
        </div>
    )
}

export default Header;