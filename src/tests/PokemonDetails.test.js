import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('7. Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const { name, summary } = pokemonList[0];

    const heading = screen.getByRole('heading', {
      name: `${name} Details`,
    });

    const detailsHeading = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    const details = screen.getByText(summary);

    expect(heading).toBeInTheDocument();
    expect(detailsHeading).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const { name, foundAt } = pokemonList[0];

    const locationsHeading = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationsHeading).toBeInTheDocument();

    const pokemonLocations = screen.getAllByAltText(`${name} location`);
    expect(pokemonLocations).toHaveLength(foundAt.length);

    foundAt.forEach(({ location, map }, index) => {
      expect(pokemonLocations[index]).toHaveAttribute('src', map);

      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
    });
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const { name } = pokemonList[0];

    const favoriteBox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteBox).toBeInTheDocument();

    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .not.toBeInTheDocument();

    userEvent.click(favoriteBox);

    expect(screen.queryByAltText(`${name} is marked as favorite`)).toBeInTheDocument();

    userEvent.click(favoriteBox);

    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .not.toBeInTheDocument();
  });
});
