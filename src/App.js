import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppHead from './components/AppHead/AppHead';
import AppBody from './components/AppBody/AppBody';
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts";
import { dummyData } from './dummyTransactions';

function App() {
  // Calculate initial expenses and balance from dummyData
  const initialExpenses = dummyData.reduce((sum, t) => sum + Number(t.price), 0);
  const initialBalance = 5000 - initialExpenses;
  const [money, setMoney] = useState({
    balance: initialBalance,
    expenses: initialExpenses
  });
  const [transactionData, setTransactionData] = useState(dummyData);
  const initialRender = useRef(true);

    useEffect(() => {
      if (initialRender.current) {
        const localData = localStorage.getItem("allData");
        if (localData) {
          const { money, transactionData } = JSON.parse(localData);
          setMoney(money);
          setTransactionData(transactionData);
        } else {
          const initialState = { money: { balance: initialBalance, expenses: initialExpenses }, transactionData: dummyData };
          setMoney(initialState.money);
          setTransactionData(initialState.transactionData);
          localStorage.setItem("allData", JSON.stringify(initialState));
        }
        initialRender.current = false;
      }
    }, [initialBalance, initialExpenses]);

  useEffect(() => {
    if (!initialRender.current) localStorage.setItem("allData", JSON.stringify({ money, transactionData }));
  }, [money, transactionData]);



  return (
    <main className='App'>
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
          <Navbar />
          <AppHead balance={money.balance} expenses={money.expenses} />
          <AppBody transactionData={transactionData} />
        </TransactionsContext.Provider>
      </MoneyContext.Provider>
    </main>
  );
}

export default App;
