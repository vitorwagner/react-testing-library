import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('5. Testa o componente <Pokedex.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(nextButton);

    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypesNumber = 7;

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(pokemonTypesNumber);

    const bugFilter = screen.getByRole('button', {
      name: /bug/i,
    });

    userEvent.click(bugFilter);

    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    const dragonFilter = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(dragonFilter);

    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
  });

  test('Testa o botão All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
