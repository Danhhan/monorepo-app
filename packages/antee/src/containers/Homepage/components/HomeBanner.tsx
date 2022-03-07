import React, { FunctionComponent } from 'react';
import { FlexGroup, FlexItem, Link } from '@antoree/ant-ui';
import styles from '../Homepage.module.scss';
import sty from '../HomepageV2.module.scss';
import { SideBarDesktop } from '../../../components';
import banner1 from '../../../assets/images/banner1.png';
import banner2 from '../../../assets/images/banner2.png';
import banner3 from '../../../assets/images/banner3.png';

interface OwnProps {}

type Props = OwnProps;

const HomeBanner: FunctionComponent = () => {
  return (
    <div className="mb-4 md:mb-8">
      <FlexGroup gutterSize="none">
        <FlexItem className={styles.navSideBarContain}>
          <div className={sty.sideBardesktop}>
            <SideBarDesktop />
          </div>
        </FlexItem>
        <FlexItem className={styles.bannerSection} grow={4}>
          <FlexGroup gutterSize="none" responsive={false} direction="column">
            <FlexItem className="mb-4" grow={2}>
              <Link to="/testing" style={{ display: 'block', height: '100%' }}>
                <img
                  className="block w-full object-cover object-center rounded-xl h-full"
                  src={banner1}
                  srcSet={`${banner1} 680w`}
                  sizes="50vw"
                  alt="map"
                />
              </Link>
            </FlexItem>
            <FlexItem>
              <FlexGroup gutterSize="m">
                <FlexItem grow={3}>
                  <Link to="/search-page?certificates=1">
                    <img
                      className="block w-full h-full object-cover object-center rounded-xl"
                      src={banner2}
                      alt="map"
                    />
                  </Link>
                </FlexItem>
                <FlexItem grow={2}>
                  <Link to="/trial">
                    <img
                      className="block w-full  h-full object-cover object-center rounded-xl"
                      src={banner3}
                      alt="map"
                    />
                  </Link>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
      </FlexGroup>
    </div>
  );
};

export default HomeBanner;
