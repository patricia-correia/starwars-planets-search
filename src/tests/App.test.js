import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import TableProvider from '../context/TableProvider';
import userEvent from '@testing-library/user-event';

describe('testando a aplicação', () => {

  test('testando os itens rederizado na tela', () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const column = screen.getByText(/column/i)
    expect(column).toBeInTheDocument();

    const operator = screen.getByText(/operator/i)
    expect(operator).toBeInTheDocument();

    const value = screen.getByText(/value/i)
    expect(value).toBeInTheDocument();


  });

  test('testando os inputs', () => {

    render(<App />)

    const columnFilter = screen.getByRole('combobox', {
      name: /column/i
    })
    expect(columnFilter).toBeInTheDocument();

    const operatorFilter = screen.getByRole('combobox', {
      name: /operator/i
    })
    expect(operatorFilter).toBeInTheDocument();

    const filterValue = screen.getByRole('spinbutton', {
      name: /value/i
    })
    expect(filterValue).toBeInTheDocument();
  });

  test('testando os filtros', async () => {
    render(<TableProvider><App /></TableProvider>);
    const searchInput = await screen.findByTestId('name-filter');
    const tatooine = await screen.findByText(/tatooine/i);

    expect(searchInput).toBeDefined();
    expect(tatooine).toBeInTheDocument();

    userEvent.type(searchInput, 'tato')
    expect(searchInput).toHaveProperty('value', 'tato');
  });


});
