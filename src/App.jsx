import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);

  const [newExpense, setNewExpense] = useState({
    name: '',
    description: '',
    amount: '',
    date: '',
    category: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc'});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewExpense({...newExpense, [name]: value })
};
const handleSubmit = (e) => {
  e.prventDefault();
  if (!newExpense.description || !newExpense.amount || !newExpense.date) return;

  const expense = {
    id: expenses.length + 1,
    description: newExpense.description,
    amount: parseFloat(newExpense.amount),
    date: newExpense.date,
    category: newExpense.category || 'Other'
  };
  setExpenses([...expenses, expense]);
  setNewExpense({ name: '', description: '', amount: '', date: '', category: '' });

};
const sortedExpenses = [...expenses].sort((a, b) => {
  if (a[sortConfig.key] < b[sortConfig.key]) {
    return sortConfig.direction === 'asc' ? -1 : 1;
  }
  return 0;
});
const filteredExpenses = sortedExpenses.filter(expense =>
  expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  expense.category.toLowerCase().includes(searchTerm.toLowerCase())
);
return (
  <div className='app'>
    <header className='header'>
      <h1>Expense Trainer</h1>
      <p>Start tracking your expenses today!</p>
    </header>

    <div className='container'>
      <section className='add-expense'>
        <h2>Add Expense</h2>
        <p>Enter expense details below</p>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='expense-name-label'>Chapo</label>
            <input 
            type="text" 
            name="description"
            placeholder='Enter expense description'
            value={newExpense.description}
            onChange={handleInputChange}
            required
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <input
             type="text" 
             name='description'
             placeholder='Enter expense: Friday Supper'
             value={newExpense.description}
             onChange={handleInputChange}
             required/>
          </div>
          <div className='form-group'>
            <label>Amount</label>
            <input
             type="number"
             name='amount'
             placeholder='Enter Amount'
             value={newExpense.amount}
             onChange={handleInputChange}
             min="0"
             required
             />
          </div>
          <div className='form-group'>
            <label>Date</label>
            <input
             type="date"
             name='date' 
             value={newExpense.date}
             onChange={handleInputChange}
             required
             />
          </div>
          <div className='form-group'>
            <label>Category</label>
            <select
             name="category"
             value={newExpense.category}
             onChange={handleInputChange}
             required
             >
               <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
             </select>
          </div>
          <button type="submit" className='submit-btn'>Submit</button>
        </form>
      </section>
      <section className='expense-list'>
        <div className='search-box'>
          <input
           type="text"
           placeholder='Search by category and description'
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
              <th onClick={() => requestSort('description')}>
                    Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('category')}>
                    Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('amount')}>
                    Amount (KSh) {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('date')}>
                    Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>{expense.amount.toFixed(2)}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className='no-results'>No expenses</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
);
}


export default App
