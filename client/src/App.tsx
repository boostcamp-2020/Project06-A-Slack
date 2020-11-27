import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFound, Login, Home } from '@/pages';
import theme from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
