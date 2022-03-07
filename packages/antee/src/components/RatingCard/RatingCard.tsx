/* eslint-disable camelcase */
import { Text, Icon } from '@antoree/ant-ui';

import style from './RatingCard.module.scss';

export type RatingcardProps = {
  // eslint-disable-next-line camelcase
  averageRating: number;
};

// eslint-disable-next-line camelcase
const RatingCard: React.FC<RatingcardProps> = ({ averageRating }) => {
  return (
    <Text
      size="m"
      className={style.ratingChild}
      style={{
        color: averageRating !== 0 ? '#ffc700' : '#ABB3BD',
      }}
    >
      {averageRating !== 0 ? Math.round(averageRating * 100) / 100 : '--'}&nbsp;
      <Icon type="starFilled" size="m" />
    </Text>
  );
};

export default RatingCard;
