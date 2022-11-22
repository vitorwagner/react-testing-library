import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1. Testando o componente <App.js />', () => {
  test('Testa o conjunto fixo de links de navegação no topo da aplicação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Testa o botão home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  test('Testa o botão about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  test('Testa o botão about', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa o redirecionamento para o componente NotFound', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/Nidoking');
    });

    const pikachuImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(pikachuImage).toBeInTheDocument();
  });
});
