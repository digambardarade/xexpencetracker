
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import "./TransactionBar.css";
import foodIcon from "../../assets/food.svg";
import movieIcon from "../../assets/movie.svg";
import travelIcon from "../../assets/travel.svg";
import deleteIcon from "../../assets/closeIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';



const TransactionBar = ({ title, date, amount, category, id }) => {
    //contexts
    const [money, setMoney] = useContext(MoneyContext);
    const [transactionData, setTransactionData] = useContext(TransactionsContext);

    // Modal state
    const [modalOn, setModalOn] = useState(false);

    // Select icon based on category
    const selectIcon = () => {
        if (category === "food") return foodIcon;
        if (category === "entertainment") return movieIcon;
        if (category === "travel") return travelIcon;
        return foodIcon;
    };

    // Delete transaction handler
    const deleteTransaction = () => {
        const updatedTransactions = transactionData.filter(t => t.id !== id);
        const deletedAmount = Number(amount);
        setTransactionData(updatedTransactions);
        setMoney({
            balance: money.balance + deletedAmount,
            expenses: money.expenses - deletedAmount
        });
    };

    // Toggle modal handler
    const toggleModal = () => setModalOn(m => !m);

    return (
        <div className='TransactionBar'>
            <span className='transactionIcon'>
                <img src={selectIcon()} alt="" />
            </span>
            <span className='TransactionBarBody'>
                <span className='TransactionText'>
                    <span className='TransactionName'>{title}</span>
                    <span className='TransactionDate'>{date}</span>
                </span>
                <span className='TransactionAmount cardTextRed'>₹{amount}</span>
            </span>
            <Button icon={deleteIcon} buttonSize="smallButton" background="backgroundRed" clickFunction={deleteTransaction}/>
            <Button icon={editIcon} buttonSize="smallButton" background="backgroundOrange" clickFunction={toggleModal} />
            {modalOn ? (
                <Modal 
                    toggleModal={toggleModal} 
                    text="Edit Expense"
                    existingData={{title, date, amount, category, id}}
                />
            ) : null}
        </div>
    );
};

TransactionBar.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default TransactionBar;