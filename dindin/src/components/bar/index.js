import './style.css';
import dateArrow from '../../assets/date-arrow.svg';

function Bar({ AscOrderState, setAscOrderState }) {

    function HandleOrderStateClick() {
        setAscOrderState(!AscOrderState)
    }

    return (
        <div className="bar">
            <div
                onClick={() => HandleOrderStateClick()}
                className="space click">
                <h4>Data</h4>
                <img
                    className={AscOrderState ? "date-arrow asc" : "date-arrow"}
                    src={dateArrow}
                    alt="date-arrow"
                />
            </div>
            <div className="space">
                <h4>Dia da semana</h4>
            </div>
            <div className="space">
                <h4>Descrição</h4>
            </div>
            <div className="space">
                <h4>Categoria</h4>
            </div>
            <div className="space">
                <h4>Valor</h4>
            </div>
            <div className="space">
            </div>
        </div>
    )
}

export default Bar;