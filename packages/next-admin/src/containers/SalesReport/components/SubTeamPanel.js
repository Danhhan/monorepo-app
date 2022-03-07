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

const SubTeamPanel = ({ subTeam }) => {
  const [subToggleSelected, setSubToggleSelected] = useState(false);
  // subTeam.memberSub.map(item => console.log(item.formatted_probation_date));
  return (
    <>
      <Spacer size="s" />
      <Accordion
        id={`${subTeam.id}`}
        style={{ width: 'fit-content' }}
        buttonClassName=" w-max pl-8"
        buttonContentClassName=" w-max"
        arrowDisplay="none"
        buttonProps={{
          style: {
            userSelect: 'text',
            textDecoration: 'none',
          },
        }}
        onToggle={isOpen => setSubToggleSelected(isOpen)}
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
            {subTeam?.memberSub && (
              <div className="px-4">
                <ButtonIcon
                  className="rounded-full transition ease-in-out duration-300"
                  style={{
                    transform: `rotateZ(${
                      subToggleSelected ? '90deg' : '0deg'
                    })`,
                  }}
                  display="fill"
                  color="success"
                  size="xs"
                  iconSize="m"
                  aria-label="arrowRight"
                  iconType="arrowRight"
                />
              </div>
            )}
            <FlexGroup className="py-4" gutterSize="none" responsive={false}>
              <TeamPanelCell
                width={70}
                label={<FormattedMessage defaultMessage="Team" />}
                value={subTeam.id}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Team Name" />}
                value={subTeam.name}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Contacts" />}
                value={subTeam.total_contacts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Tested" />}
                value={subTeam.total_tested}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial Booked" />}
                value={subTeam.total_trials}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Contracts" />}
                value={subTeam.total_contracts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Customer" />}
                value={subTeam.total_customer}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Tested/Contacts" />}
                value={subTeam.total_div_tested_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial/Tested" />}
                value={subTeam.total_div_trial_test}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Customer/Contacts" />}
                value={subTeam.total_div_customer_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Conversion Cost" />}
                value={subTeam.total_contact_fee}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                width={40}
                label={<FormattedMessage defaultMessage="ROI" />}
                value={subTeam.total_ROI}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GMV" />}
                value={subTeam.total_gmv_amount}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                width={200}
                label={<FormattedMessage defaultMessage="GPC" />}
                value={subTeam.total_aov}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPE" />}
                value={subTeam.total_sub_gpe}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Employees" />}
                value={subTeam.total_sub_members}
                convertNumber
                toDot={false}
              />
            </FlexGroup>
          </Panel>
        }
      >
        {subTeam?.memberSub?.map(subMember => (
          <Panel
            className="border flex justify-center items-center mb-0 pl-8"
            style={{
              width: '100%',
            }}
            key={subMember?.sale_id}
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="subdued"
          >
            <div className="px-5">
              <ButtonEmpty size="xs" />
            </div>
            <div
              className="flex py-4  flex-1"
              style={{ borderBottom: '1px solid #c4c4c4' }}
            >
              {/* <TeamPanelCell
                label={<FormattedMessage defaultMessage="Team" />}
                value={subMember.sale_id}
              /> */}
              <TeamPanelCell
                width={200}
                label={<FormattedMessage defaultMessage="Sale name" />}
                value={subMember.sale_name}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Contacts" />}
                value={subMember.contacts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Tested" />}
                value={subMember.tested}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial Booked" />}
                value={subMember.trials}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Contracts" />}
                value={subMember.contracts}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Customer" />}
                value={subMember.customer}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Tested/Contacts" />}
                value={subMember.div_tested_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Trial/Tested" />}
                value={subMember.div_trial_test}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                width={150}
                label={<FormattedMessage defaultMessage="Customer/Contact" />}
                value={subMember.div_customer_contacts}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Conversion Cost" />}
                value={subMember.contact_fee}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                width={40}
                label={<FormattedMessage defaultMessage="ROI" />}
                value={subMember.ROI}
                digitAfterDecimal={1}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GMV" />}
                value={subMember.gmv_amount}
                convertNumber
                toDot={false}
                width={100}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="GPC" />}
                value={subMember.aov}
                convertNumber
                toDot={false}
              />
              <TeamPanelCell
                label={<FormattedMessage defaultMessage="Probation date" />}
                value={subMember.formatted_probation_date}
              />
              {/* <TeamPanelCell
                label={<FormattedMessage defaultMessage="Note" />}
                value={subMember.note ? subMember.note : ''}
              /> */}
            </div>
          </Panel>
        ))}
      </Accordion>
    </>
  );
};

SubTeamPanel.defaultProps = {
  id: '',
  subTeam: {},
};

SubTeamPanel.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subTeam: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
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
        formatted_probation_date: PropTypes.instanceOf(Date),
        // note: PropTypes.string,
      }),
    ),
  }),
};

export default SubTeamPanel;
