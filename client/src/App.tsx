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
          <Route path="/client/1" exact component={WorkSpacePage} />
          <Route path="/client/1/:channelId" exact component={WorkSpacePage} />
          <Route path="/client/1/:channelId/:rightSideType" exact component={WorkSpacePage} />
          <Route
            path="/client/1/:channelId/:rightSideType/:threadId"
            exact
            component={WorkSpacePage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
