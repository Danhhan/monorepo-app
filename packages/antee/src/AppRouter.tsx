import { Portal, Progress } from '@antoree/ant-ui';
import { initBoot } from 'bootApp';
import { MainLayout, PrivateRoute, AutoRedirect } from 'components';
import { PUBLIC_URL } from 'configs/env.conf';
import { getPathName } from 'helpers';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';
import { QueryParamProvider } from 'use-query-params';
import { Footer } from './components/Footer';

const fallbackComponent = (
  <div className="absolute z-10">
    <Portal>
      <Progress size="xs" color="accent" position="fixed" />
    </Portal>
  </div>
);

const EnterTest = lazy(() => import('containers/EnterTest'));
const Sitemap = lazy(() => import('containers/Sitemap'));

const SignIn = lazy(() => import('containers/SignIn'));
const Courses = lazy(() => import('containers/Courses'));
const TodaySession = lazy(() => import('containers/TodaySession/TodaySession'));
const Sessions = lazy(() => import('containers/Sessions'));
const Testing = lazy(() => import('containers/Testing'));
const TrialTeacher = lazy(() => import('containers/TrialTeacher'));
const SourceLink = lazy(() => import('containers/SourceLink'));
const Introduce = lazy(() => import('containers/Introduce'));
const Homepage = lazy(() => import('containers/Homepage'));
const Category = lazy(() => import('containers/Category'));
const Search = lazy(() => import('containers/Search'));
const DetailTeacher = lazy(() => import('containers/DetailTeacher'));
const DetailTeacherClone = lazy(() => import('containers/DetailTeacherClone'));
const AboutUs = lazy(() => import('containers/FAQ/AboutUs'));
const Policy = lazy(() => import('containers/FAQ/Policy'));
const Term = lazy(() => import('containers/FAQ/Term'));
const Privacy = lazy(() => import('containers/FAQ/Privacy'));
const MainAccount = lazy(
  () => import('containers/Account/MainAccount/MainAccount'),
);
const AllAffiliateMarketing = lazy(
  () => import('containers/Affiliate/IncludeAffiliate/AllAffiliateMarketing'),
);
const Affiliates = lazy(() => import('containers/Affiliate/Affiliates'));
const AffiliateList = lazy(
  () => import('containers/Affiliate/Affiliates/components/AffiliateList'),
);
const AffiliateDashboard = lazy(
  () => import('containers/Affiliate/Affiliates/components/AffiliateDashboard'),
);
const boot = initBoot();
type Props = {
  dataCampain: {};
};

const AppRouter: React.FC<Props> = dataCampain => {
  const { authenticateHandler } = useAuth();
  boot.start(authenticateHandler);
  return (
    <Router basename={PUBLIC_URL}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route path="/enter-test" exact component={EnterTest} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/source" exact component={SourceLink} />
          {/* <Route path="/sitemap.xml" exact component={Sitemap} /> */}

          <Route path="/introduce" exact component={Introduce} />
          <Route path="/tkhomepage" exact component={Homepage} />
          <Route path="/category/:topic" exact component={Category} />
          <Route path="/search-page" exact component={Search} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/policy" exact component={Policy} />
          <Route path="/term" exact component={Term} />
          <Route path="/privacy" exact component={Privacy} />
          <Route
            path="/detail-teacher/:id"
            exact
            component={() => <DetailTeacher dataCampain={dataCampain} />}
          />
          <Route path="/teacher/:id" exact component={DetailTeacherClone} />
          <Route path="/testing" component={Testing} />
          <Route path="/account" component={MainAccount} />
          <Route path="/affiliatemarketing" component={AllAffiliateMarketing} />
          <Route path="/affiliates" exact component={Affiliates} />
          <Route path="/affiliateList" exact component={AffiliateList} />
          <Route
            path="/affiliateDashboard"
            exact
            component={AffiliateDashboard}
          />
          <PrivateRoute
            redirectPath="/sign-in"
            path="/(home|courses|testing|trial|today|source|introduce|tkhomepage|affiliateList|affiliateDashboard|affiliatemarketing)"
          >
            <MainLayout>
              <Suspense fallback={fallbackComponent}>
                <Switch>
                  <Route path="/home" exact component={TodaySession} />
                  <Route path="/courses" exact component={Courses} />
                  <Route path="/trial" exact component={TrialTeacher} />
                  <Route path="/testing" exact component={Testing} />
                  <Route path="/today" exact component={TodaySession} />
                  <Route path="/affiliates" exact component={Affiliates} />
                  <Route
                    path="/affiliateList"
                    exact
                    component={AffiliateList}
                  />
                  <Route
                    path="/affiliateDashboard"
                    exact
                    component={AffiliateDashboard}
                  />
                  <Route
                    path="/courses/:id/sessions"
                    exact
                    component={Sessions}
                  />
                  <Route
                    path="/affiliatemarketing"
                    exact
                    component={AllAffiliateMarketing}
                  />
                </Switch>
              </Suspense>
            </MainLayout>
          </PrivateRoute>
          <Route
            path="*"
            render={() => {
              return <AutoRedirect />;
            }}
          />
        </Switch>
      </QueryParamProvider>
    </Router>
  );
};

export default AppRouter;
