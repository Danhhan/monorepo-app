/* eslint-disable camelcase */
import { Text, Icon } from '@antoree/ant-ui';

import style from './RatingCard.module.scss';

export type RatingcardProps = {
  // eslint-disable-next-line camelcase
  average_rating: number;
};

// eslint-disable-next-line camelcase
const RatingCard: React.FC<RatingcardProps> = ({ average_rating }) => {
  return (
    <div
      className={style.ratingBorder}
      style={{ backgroundColor: average_rating !== 0 ? '#ffc700' : '#ABB3BD' }}
    >
      <Text size="s" className={style.ratingChild} style={{ color: '#fff' }}>
        {average_rating !== 0 ? Math.round(average_rating * 100) / 100 : '--'}
        <Icon type="starFilled" />
      </Text>
    </div>
  );
};

export default RatingCard;
