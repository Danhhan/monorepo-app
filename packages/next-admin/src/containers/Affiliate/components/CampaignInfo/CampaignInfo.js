import { Card, FlexItem, Text } from '@antoree/ant-ui';
import { STATUS_HIDDEN } from 'containers/Affiliate/constant';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import CampaignInfoModal from './CampaignInfoModal';

function CampaignInfo({
  campaign,
  updateCampaignStatusMutate,
  isCardComponent,
}) {
  const { toggle, close, isVisiable } = useToggle();
  const handleUpdateCampaignStatus = () => {
    updateCampaignStatusMutate.mutate({
      id: campaign.id,
      status: STATUS_HIDDEN,
    });
  };
  return (
    <>
      {isCardComponent ? (
        <FlexItem>
          <Card
            textAlign="left"
            image={
              <div style={{ height: 136 }}>
                <img
                  className="w-full rounded-t-lg"
                  src={campaign?.imageUrl}
                  alt={campaign?.utmCampaign}
                />
              </div>
            }
            title={campaign?.utmCampaign}
            onClick={toggle}
          />
        </FlexItem>
      ) : (
        <Text onClick={toggle} className="text-primary cursor-pointer">
          <p>{campaign?.utmCampaign}</p>
        </Text>
      )}

      {isVisiable && (
        <CampaignInfoModal
          campaign={campaign}
          onCloseModal={close}
          isCardComponent={isCardComponent}
          onUpdateCampaignStatus={handleUpdateCampaignStatus}
        />
      )}
    </>
  );
}

CampaignInfo.defaultProps = {
  isCardComponent: false,
  campaign: {},
};

CampaignInfo.propTypes = {
  isCardComponent: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  campaign: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  updateCampaignStatusMutate: PropTypes.any.isRequired,
};

export default CampaignInfo;
