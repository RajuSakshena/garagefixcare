
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App';

// Use the context type expected by HelmetProvider
type HelmetContext = NonNullable<
  React.ComponentProps<typeof HelmetProvider>['context']
>;

export function render(url: string) {
  const helmetContext = {} as HelmetContext;

  const app = (
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  const html = renderToString(app);

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
