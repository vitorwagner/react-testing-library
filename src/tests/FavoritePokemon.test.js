import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('3. Testa o componente <FavoritePokemon.js />', () => {
  test('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavoritesMessage = screen.getByText(/no favorite pokémon found/i);

    expect(noFavoritesMessage).toBeInTheDocument();
  });
});
