import {
  Panel,
  Spacer,
  ButtonIcon,
  Accordion,
  ButtonEmpty,
  FlexGroup,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import TeamPanelCell from './TeamPanelCell';
import SubTeamPanel from './SubTeamPanel';

const TeamPanel = ({ data, id }) => {
  const [toggleSelected, setToggleSelected] = useState(false);
  const [subToggleSelected, setSubToggleSelected] = useState(false);
  return (
    <div className="w-full mb-1">
      <Accordion
        id={`${id}`}
        buttonClassName="w-full"
        buttonContentClassName="w-full"
        arrowDisplay="none"
        onToggle={isOpen => setToggleSelected(isOpen)}
        buttonProps={{
          style: {
            userSelect: 'text',
            textDecoration: 'none',
          },
        }}
        buttonContent={
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
            <div className="px-4">
              <ButtonIcon
                className="rounded-full transition ease-in-out duration-300"
                style={{
                  transform: `rotateZ(${toggleSelected ? '90deg' : '0deg'})`,
                }}
                display="fill"
                size="xs"
                iconSize="m"
                aria-label="arrowRight"
                iconType="arrowRight"
              />
            </div>
            <FlexGroup className="py-4" gutterSize="none" responsive={false}>
              <TeamPanelCell
                width={70}
                label={<FormattedMessage defaultMessage="Team" />}
                value={data.order}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Team Name" />}
                value={data.team_name}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Contacts" />}
                value={data.total_contacts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Tested" />}
                value={data.total_tested}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial Booked" />}
                value={data.total_trials}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Contracts" />}
                value={data.total_contracts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Customer" />}
                value={data.total_customer}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Tested/Contacts" />}
                value={data.total_div_tested_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial/Tested" />}
                value={data.total_div_trial_test}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Customer/Contact" />}
                value={data.total_div_customer_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Conversion Cost" />}
                value={data.total_contact_fee}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                width={100}
                label={<FormattedMessage defaultMessage="ROI" />}
                value={data.total_ROI}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={100}
                label={<FormattedMessage defaultMessage="GMV" />}
                value={data.total_gmv_amount}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPC" />}
                value={data.total_aov}
                convertNumber
                toDot={false}
                width={100}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPE" />}
                value={data.total_gpe}
                convertNumber
                toDot={false}
                width={100}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Employees" />}
                value={data.total_members}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPC" />}
                value={data.total_aov}
                convertNumber
                toDot={false}
                width={200}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPE" />}
                value={data.total_gpe}
                convertNumber
                toDot={false}
                // width={100}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Employees" />}
                value={data.total_members}
              />
            </FlexGroup>
          </Panel>
        }
      >
        {toggleSelected
          ? data?.subTeams?.map(subTeam => <SubTeamPanel subTeam={subTeam} />)
          : null}
      </Accordion>
      <Spacer size="s" />
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
    order: PropTypes.number,
    team_name: PropTypes.string,
    members: PropTypes.number,
    total_contact_fee: PropTypes.number,
    total_contacts: PropTypes.number,
    total_tested: PropTypes.number,
    total_div_tested_contacts: PropTypes.number,
    total_notes_tested: PropTypes.number,
    total_contracts: PropTypes.number,
    total_customer: PropTypes.number,
    total_div_customer_contract: PropTypes.number,
    total_div_customer_tested: PropTypes.number,
    total_div_customer_contacts: PropTypes.number,
    total_div_contracts_tested: PropTypes.number,
    total_trials: PropTypes.number,
    total_trial_hours: PropTypes.number,
    total_div_trial_test: PropTypes.number,
    total_ROI: PropTypes.number,
    total_gmv_amount: PropTypes.number,
    total_aov: PropTypes.number,
    total_gpe: PropTypes.number,
    total_members: PropTypes.number,
    subTeams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        team_name: PropTypes.string,
        total_contact_fee: PropTypes.number,
        total_contacts: PropTypes.number,
        total_tested: PropTypes.number,
        total_div_tested_contacts: PropTypes.number,
        total_notes_tested: PropTypes.number,
        total_contracts: PropTypes.number,
        total_customer: PropTypes.number,
        total_div_customer_contract: PropTypes.number,
        total_div_customer_tested: PropTypes.number,
        total_div_customer_contacts: PropTypes.number,
        total_div_contracts_tested: PropTypes.number,
        total_trials: PropTypes.number,
        total_trial_hours: PropTypes.number,
        total_div_trial_test: PropTypes.number,
        total_ROI: PropTypes.number,
        total_gmv_amount: PropTypes.number,
        total_aov: PropTypes.number,
        total_sub_gpe: PropTypes.number,
        total_sub_members: PropTypes.number,
        memberSub: PropTypes.arrayOf(
          PropTypes.shape({
            sale_id: PropTypes.number,
            sale_name: PropTypes.string,
            contacts: PropTypes.number,
            tested: PropTypes.number,
            customer: PropTypes.number,
            div_customer_contacts: PropTypes.number,
            div_customer_tested: PropTypes.number,
            div_customer_contract: PropTypes.number,
            div_tested_contacts: PropTypes.number,
            notes_tested: PropTypes.number,
            contracts: PropTypes.number,
            div_contracts_tested: PropTypes.number,
            trials: PropTypes.number,
            trial_hours: PropTypes.number,
            div_trial_test: PropTypes.number,
            ROI: PropTypes.number,
            gmv_amount: PropTypes.number,
            aov: PropTypes.number,
            formatted_probation_date: PropTypes.string,
            // note: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};

export default TeamPanel;
