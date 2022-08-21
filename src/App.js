import React from 'react';
import Table from './component/Table';
import './App.css';
import SearchInput from './component/SearchInput';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <SearchInput />
      <Table />
    </TableProvider>
  );
}

export default App;
