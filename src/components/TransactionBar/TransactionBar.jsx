import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
//styles
import "./TransactionBar.css"
//asstes
import foodIcon from "../../assets/food.svg";
import movieIcon from "../../assets/movie.svg";
import travelIcon from "../../assets/travel.svg";
import deleteIcon from "../../assets/closeIcon.svg";
import editIcon from "../../assets/editIcon.svg";
//components
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';
//contexts


const TransactionBar = ({ name, date, amount, category, id }) => {
TransactionBar.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
    //contexts
    const [money, setMoney] = useContext(MoneyContext);
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    //states
    const [modalOn, setModalOn] = useState(false);
    //functions
    const toggleModal = () => setModalOn(!modalOn);
    const selectIcon = () => {
        if(category === "food") return foodIcon;
        if(category === "entertainment") return movieIcon;
        if(category === "travel") return travelIcon;
    }
    const deleteTransaction = () => {
        const indexOfTransaction = transactionData.findIndex(item => id === item.id);

        const newBalance = money.balance + Number(amount);
        const newExpense = money.expenses - Number(amount);

        transactionData.splice(indexOfTransaction, 1);

        setTransactionData([...transactionData]);
        setMoney({balance: newBalance, expenses: newExpense});
    }
    return (
        <div className='TransactionBar'>
            <span className='transactionIcon'>
                <img src={selectIcon()}/>
            </span>
            <span className='TransactionBarBody'>
                <span className='TransactionText'>
                    <span className='TransactionName'>{name}</span>
                    <span className='TransactionDate'>{date}</span>
                </span>
                <span className='TransactionAmount cardTextRed'>₹{amount}</span>
            </span>
            <Button icon={deleteIcon} buttonSize="smallButton" background="backgroundRed" clickFunction={deleteTransaction}/>
            <Button icon={editIcon} buttonSize="smallButton" background="backgroundOrange" clickFunction={toggleModal} />
            {modalOn ? 
                <Modal 
                toggleModal={toggleModal} 
                text="Edit Expense"
                existingData={{name, date, amount, category, id}}
                /> 
            :null
            }
        </div>
    );
};

export default TransactionBar;