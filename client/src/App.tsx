import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  NotFoundPage,
  LoginPage,
  HomePage,
  EmailVerifyPage,
  SignupPage,
  WorkSpacePage,
} from '@/pages';
import theme from '@/styles/theme';
import { GlobalStyle } from '@/styles';
import { withAuth } from '@/hoc';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={withAuth(HomePage)} />
          <Route path="/login" component={LoginPage} />
          <Route path="/verify" component={EmailVerifyPage} />
          <Route path="/signup" component={SignupPage} />
          <Route
            path="/client/1/:channelId(\d+)?/:rightSideType(detail|user_profile|thread)?/:threadId(\d+)?"
            exact
            component={withAuth(WorkSpacePage)}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
