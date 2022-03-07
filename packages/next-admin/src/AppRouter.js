import { AntoreeCustomizeLoading } from '@antoree/ant-ui';
import intialBoot from 'bootApplication';
import { MainLayout, PrivateRoute } from 'components';
import { PRIVATE_ROUTES } from 'configs/app.routes';
import { getActiveModules } from 'helpers';
import { useBreadcrumbs, useCurrentUser } from 'hooks';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

const bootApplication = intialBoot();

const fallbackComponent = (
  <div className="flex flex-col items-center justify-center justify-items-center py-10 top-0 left-0 h-screen w-screen">
    {/* <LoadingSpinner size="xl" />
    <Text>
      <p>Loading content...</p>
    </Text> */}
    <AntoreeCustomizeLoading />
  </div>
);

const SignIn = lazy(() => import('containers/SignIn'));
const ExportPrices = lazy(() => import('./containers/Price/Export'));

const activeModules = getActiveModules();

function AppRouter() {
  const [, fetchCurrentUser] = useCurrentUser();

  bootApplication({ onAuthenticated: fetchCurrentUser });

  const breadcrumbs = useBreadcrumbs();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/prices/export" exact component={ExportPrices} />
          <PrivateRoute path={`/(${activeModules})`} redirectPath="/sign-in">
            <>
              <MainLayout breadcrumbs={breadcrumbs} />
              <Suspense fallback={fallbackComponent}>
                <Switch>
                  {PRIVATE_ROUTES.map(route => (
                    <Route
                      key={route.id}
                      path={`${route.path}`}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </Suspense>
            </>
          </PrivateRoute>
          <Route path="*">Page Not Found</Route>
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}

export default AppRouter;
