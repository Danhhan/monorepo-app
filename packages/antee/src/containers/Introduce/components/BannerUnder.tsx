import React, { FunctionComponent } from 'react';
import {
  Button,
  FlexGroup,
  FlexItem,
  Icon,
  Page,
  PageBody,
  Slider,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import mapImage from '../../../assets/images/introduce-img-3.png';

interface BannerUnderProps {
  textArr: any;
}

const BannerUnder: FunctionComponent<BannerUnderProps> = ({ textArr }) => {
  return (
    <div className="py-10 px-4 md:py-14 md:pt-28">
      <FlexGroup gutterSize="none">
        <FlexItem grow={2}>
          <img className="block w-full" src={mapImage} alt="map" />
        </FlexItem>
        <FlexItem>
          <Text size="m" color="#69707D" className="font-normal">
            <h2>
              <FormattedMessage defaultMessage="Có thể tiếp cận" />
            </h2>
          </Text>
          <Title className="mb-4 font-medium" size="l">
            <h2>
              <FormattedMessage defaultMessage="3000+ Giáo viên " />
            </h2>
          </Title>
          <ul>
            {textArr?.map((item: any) => (
              <li className="flex items-start mb-3">
                <Icon type="check" className="mr-2 mt-1" />
                <Text>
                  <p className="w-5/6">{item}</p>
                </Text>
              </li>
            ))}
          </ul>
        </FlexItem>
      </FlexGroup>
    </div>
  );
};

export default BannerUnder;
