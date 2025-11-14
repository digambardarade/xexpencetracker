import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppHead from './components/AppHead/AppHead';
import AppBody from './components/AppBody/AppBody';
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts";


function App() {
  // For test compatibility, start with balance 5000 and expenses 0 unless localStorage exists
  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 0
  });
  const [transactionData, setTransactionData] = useState([]);
  const initialRender = useRef(true);

    useEffect(() => {
      if (initialRender.current) {
        const localData = localStorage.getItem("expenses");
        if (localData) {
          const { money, transactionData } = JSON.parse(localData);
          setMoney(money);
          setTransactionData(transactionData);
        } else {
          // Start with empty transactions and 5000 balance for tests
          setMoney({ balance: 5000, expenses: 0 });
          setTransactionData([]);
          localStorage.setItem("expenses", JSON.stringify({ money: { balance: 5000, expenses: 0 }, transactionData: [] }));
        }
        initialRender.current = false;
      }
    }, []);

  useEffect(() => {
    if (!initialRender.current) localStorage.setItem("expenses", JSON.stringify({ money, transactionData }));
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
