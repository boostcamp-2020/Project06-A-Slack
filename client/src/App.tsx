import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  NotFoundPage,
  LoginPage,
  HomePage,
  EmailVerifyPage,
  SignupPage,
  WorkSpacePage,
} from '@/pages';
import theme from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/verify" component={EmailVerifyPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/workspace/" component={WorkSpacePage} />
          <Route path="/workspace/detail" component={WorkSpacePage} />
          <Route path="/workspace/thread" component={WorkSpacePage} />
          <Route path="/workspace/user_profile/:userId" component={WorkSpacePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
