import {
  AntoreeCustomizeLoading,
  BottomBar,
  Button,
  ButtonEmpty,
} from '@antoree/ant-ui';
import AppProvider from 'AppProvider';
import AppRouter from 'AppRouter';
import { ErrorBoundary } from 'components';
import { Suspense, useState } from 'react';
import styles from './assets/styles/App.module.scss';
import {
  getCookie,
  getCookieCampain,
  setCookie,
  setCookieCampain,
} from './setCookieCampain';

const fallbackComponent = (
  <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
    <AntoreeCustomizeLoading />
  </div>
);

const App: React.FC = () => {
  const [isshowCookie, setShowcookie] = useState(true);
  const urlString = window.location.href; // window.location.href
  const url = new URL(urlString);
  const campainId = url?.searchParams.get('campaign_id');
  const campaingnLinkId = url?.searchParams.get('campaign_link_id');
  const parterId = url?.searchParams.get('partner_id');
  const utmSoucre = url?.searchParams.get('utm_source');
  const utmMedium = url?.searchParams.get('utm_medium');
  const utmCampain = url?.searchParams.get('utm_campaign');

  const dataCampain = {
    campaign_id: campainId || '',
    campaign_link_id: campaingnLinkId || '',
    partner_id: parterId || '',
    utm_source: utmSoucre || '[WEB][MARKET]',
    utm_campaign: utmCampain || '[WEB][MARKET]',
    utm_medium: utmMedium || '',
  };

  setCookieCampain(
    '_utm',
    JSON.stringify(dataCampain),
    7,
    dataCampain.utm_campaign,
  );

  const cookieName = getCookie('cookie_policy');

  const cookieCampain = getCookieCampain('_utm');

  const cookieCampainJson = JSON.parse(cookieCampain);

  const hanldeAcceptCookie = () => {
    // eslint-disable-next-line no-shadow
    const cookieName = getCookie('cookie_policy');

    setCookie('cookie_policy', true, 365);
  };

  const hanldeRejectCookie = () => {
    // eslint-disable-next-line no-shadow

    setCookie('cookie_policy', false, 7);
  };

  return (
    <Suspense fallback={fallbackComponent}>
      <ErrorBoundary>
        <AppProvider>
          <AppRouter dataCampain={cookieCampainJson} />
          {cookieName === null || cookieName === '' ? (
            <BottomBar
              style={{
                backgroundColor: 'white',
                color: 'black',
              }}
              className="bottom"
            >
              <div className={styles.flexContainer}>
                <div className={styles.flexLeft}>
                  Trang web sử dụng cookies để phân tích và đem lại trải nghiệm
                  tốt nhất cho người dùng. Khi sử dụng web, bạn đồng ý cung cấp
                  cookies.
                  <a
                    style={{ marginLeft: '4px' }}
                    target="_blank"
                    href="/privacy"
                  >
                    Xem chi tiết
                  </a>
                </div>

                <div className={styles.flexRight}>
                  <span>
                    <Button
                      className={styles.buttonYes}
                      fill
                      onClick={() => {
                        hanldeAcceptCookie();
                        setShowcookie(false);
                      }}
                    >
                      Đồng ý
                    </Button>
                  </span>
                  <span style={{ marginLeft: '24px' }}>
                    <ButtonEmpty
                      className={styles.buttonYes}
                      onClick={() => {
                        hanldeRejectCookie();
                        setShowcookie(false);
                      }}
                    >
                      Bỏ qua
                    </ButtonEmpty>
                  </span>
                </div>
              </div>
            </BottomBar>
          ) : null}
        </AppProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
