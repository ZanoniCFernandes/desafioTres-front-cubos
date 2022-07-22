import './style.css';
import { getLocalItem } from '../../../utils/localStorage/index'
import AddEntry from '../add-entry';
import EditEntry from '../edit-entry';
import EditUser from '../edit-user';

function ModalBox({ User, setShowModal, ModalInfo, CategoriesArray, TransactionEditId, setOneTransactionDetail, setReloadPage }) {
  const token = getLocalItem('token');


  function selectModalContent(ModalInfo) {
    if (ModalInfo === 'add-entry') {
      return <AddEntry
        token={token}
        CategoriesArray={CategoriesArray}
        setShowModal={setShowModal}
        setReloadPage={setReloadPage}
      />
    }

    if (ModalInfo === 'edit-user') {
      return <EditUser
        token={token}
        User={User}
        setShowModal={setShowModal}
        setReloadPage={setReloadPage}
      />
    }

    if (ModalInfo === 'edit-entry') {
      return <EditEntry
        token={token}
        TransactionEditId={TransactionEditId}
        setShowModal={setShowModal}
        CategoriesArray={CategoriesArray}
        setOneTransactionDetail={setOneTransactionDetail}
        setReloadPage={setReloadPage}
      />
    }

  }

  return (
    <div className="modal" >
      <div className="card">
        <div className="content">
          {selectModalContent(ModalInfo)}
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
