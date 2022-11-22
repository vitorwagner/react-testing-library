import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('4. Testa o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Page requested not found;', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem do pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const pikachuImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(pikachuImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
