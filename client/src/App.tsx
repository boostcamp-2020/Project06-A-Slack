import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { NotFoundPage } from '@/pages';
import theme from '@/styles/theme';
import { GlobalStyle } from '@/styles';
import { withAuth } from '@/hoc';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const EmailVerifyPage = lazy(() => import('@/pages/EmailVerifyPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const WorkSpacePage = lazy(() => import('@/pages/WorkSpacePage'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<div>loading</div>}>
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
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
