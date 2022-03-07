import { Portal, Progress } from '@antoree/ant-ui';
import { MainLayout, PrivateRoute } from 'components';
import { PUBLIC_URL } from 'configs/env.conf';
import { isAuthenticated } from 'helpers';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

// const fallbackComponent = (
//   <div className="flex flex-col items-center justify-center justify-items-center py-10">
//     <LoadingSpinner size="xl" />
//     <Text>
//       <p>Loading content...</p>
//     </Text>
//   </div>
// );
const fallbackComponent = (
  <div className="absolute z-10">
    <Portal>
      <Progress size="xs" color="#32C081" position="fixed" />
    </Portal>
  </div>
);

const EnterTest = lazy(() => import('containers/EnterTest'));
const SignIn = lazy(() => import('containers/SignIn'));
const Courses = lazy(() => import('containers/Courses'));
const Sessions = lazy(() => import('containers/Sessions'));
const Schedule = lazy(() => import('containers/Schedule'));

function AppRouter() {
  return (
    <Suspense fallback={fallbackComponent}>
      <Router basename={PUBLIC_URL}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route path="/enter-test" exact component={EnterTest} />
            <Route path="/sign-in" exact component={SignIn} />
            <PrivateRoute
              redirectPath="/sign-in"
              path="/(home|courses|schedule)"
            >
              <MainLayout>
                <Suspense fallback={fallbackComponent}>
                  <Switch>
                    <Route path="/home" exact component={Courses} />
                    <Route path="/courses" exact component={Courses} />
                    <Route
                      path="/courses/:id/sessions"
                      exact
                      component={Sessions}
                    />
                    <Route
                      path="/schedule/teaching-schedule"
                      exact
                      component={Schedule}
                    />
                    <Route
                      path="/schedule/available-time-trial"
                      exact
                      component={Schedule}
                    />
                    <Route
                      path="/schedule/available-time-test"
                      exact
                      component={Schedule}
                    />
                  </Switch>
                </Suspense>
              </MainLayout>
            </PrivateRoute>
            <Route
              path="*"
              render={() => {
                if (isAuthenticated()) {
                  return <Redirect to="/home" />;
                }
                return <Redirect to="/enter-test" />;
              }}
            />
          </Switch>
        </QueryParamProvider>
      </Router>
    </Suspense>
  );
}

export default AppRouter;
