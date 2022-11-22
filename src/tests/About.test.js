import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('2. Testando o componente <About.js />', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const secondText = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
