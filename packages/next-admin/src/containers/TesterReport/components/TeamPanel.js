import { Panel } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TeamPanelCell from './TeamPanelCell';

const TeamPanel = ({ data, id }) => {
  return (
    <div
      style={{ width: '100%', minWidth: 'fit-content' }}
      className="w-full mb-1"
    >
      <Panel
        className="border flex justify-center items-center"
        style={{
          width: '100%',
        }}
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="plain"
      >
        <div className="flex py-4 flex-1">
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Booking Source" />}
            color="subdued"
            value={data?.teamName}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Open Slots" />}
            value={data?.totalOpenSlot}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Booked Slots" />}
            value={data?.totalBookedSlot}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Tested" />}
            value={data?.totalTested}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Miss By Teacher" />}
            value={data?.totalMissByTeacher}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Tested/Booked" />}
            value={`${data?.totalDivTestedBooked}%`}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Delayed/Booked" />}
            value={`${data?.totalDivDelayBooked}%`}
          />
          <TeamPanelCell
            label={<FormattedMessage defaultMessage="Missed/Booked" />}
            value={`${data?.totalDivMissBooked}%`}
          />
        </div>
      </Panel>
    </div>
  );
};

TeamPanel.defaultProps = {
  id: '',
  data: {},
};

TeamPanel.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.shape({
    teamName: PropTypes.string,
    totalOpenSlot: PropTypes.number,
    totalBookedSlot: PropTypes.number,
    totalTested: PropTypes.number,
    totalMissByTeacher: PropTypes.number,
    totalDivTestedBooked: PropTypes.number,
    totalDivDelayBooked: PropTypes.number,
    totalDivMissBooked: PropTypes.number,
  }),
};

export default TeamPanel;
