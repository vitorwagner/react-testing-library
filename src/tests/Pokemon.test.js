import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemonList from '../data';

describe('6. Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
    />);

    const { name, type, averageWeight, image } = pokemonList[0];
    const { value, measurementUnit } = averageWeight;

    const pokemonNameElement = screen.getByTestId('pokemon-name');
    expect(pokemonNameElement).toHaveTextContent(name);

    const pokemonTypeElement = screen.getByTestId('pokemon-type');
    expect(pokemonTypeElement).toHaveTextContent(type);

    const pokemonWeightElement = screen.getByTestId('pokemon-weight');
    expect(pokemonWeightElement).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    const pokemonImage = screen.getByAltText(`${name} sprite`);
    expect(pokemonImage).toHaveAttribute('src', image);

    const favoriteIcon = screen.queryByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).not.toBeInTheDocument();
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
    />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite
    />);

    const { name } = pokemonList[0];

    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
