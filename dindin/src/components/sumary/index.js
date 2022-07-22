import './style.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';
import { getLocalItem } from '../../utils/localStorage/index';

function Sumary({ setReloadPage }) {
    const token = getLocalItem('token');
    const [Extract, setExtract] = useState({ entrada: '', saida: '', saldo: '' });
    const [TreatedExtract, setTreatedExtract] = useState({ entrada: '', saida: '', saldo: '' });

    async function GetExtract() {
        try {

            const { data } = await axiosInstance.get('/transacao/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const ExtractData = { ...data };

            setExtract({ entrada: ExtractData.entrada, saida: ExtractData.saida, saldo: ExtractData.entrada - ExtractData.saida });

            const ExctractEntry = (ExtractData.entrada).toString().split('');
            ExctractEntry.splice(-2, 0, ',');
            const TreatedExtractEntry = ExctractEntry.join('');

            const ExctractOutcome = (ExtractData.saida).toString().split('');
            ExctractOutcome.splice(-2, 0, ',');
            const TreatedExtractOutcome = ExctractOutcome.join('');

            const ExtractBottom = (ExtractData.entrada - ExtractData.saida).toString().split('');
            ExtractBottom.splice(-2, 0, ',');
            const TreatedExtractBottom = ExtractBottom.join('');

            setTreatedExtract({ entrada: TreatedExtractEntry, saida: TreatedExtractOutcome, saldo: TreatedExtractBottom })

            setReloadPage(false);

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        GetExtract()
    }, [])

    useEffect(() => {
        if (TreatedExtract.saldo === '') return;
        setExtract({ ...TreatedExtract })
    }, [TreatedExtract])


    return (
        <div className="sumary-card">
            <div className="sumary-top">
                <h3>Resumo</h3>
                <div className="transaction">
                    <span>Entradas</span>
                    <span className="income">R${TreatedExtract.entrada}</span>
                </div>
                <div className="transaction">
                    <span>Saídas</span>
                    <span className="outcome">R${TreatedExtract.saida}</span>
                </div>
            </div>
            <div className="sumary-bottom">
                <div className="transaction">
                    <strong>Saldo</strong>
                    <span className={Number(TreatedExtract.saldo.replace(',', '.')) > 0 ? 'income' : 'outcome'}>R${TreatedExtract.saldo}</span>
                </div>
            </div>
        </div>
    )
}


export default Sumary;