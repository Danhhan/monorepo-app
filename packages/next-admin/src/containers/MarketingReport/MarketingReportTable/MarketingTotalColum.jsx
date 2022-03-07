import { Accordion, ButtonIcon, ToolTip } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './MarketingTable.scss';

const MarketingTotalColum = ({
  datatoltal,
  emailDetect,
  open,
  markter,
  handleOpen,
  getList,
  getData,
  handlegetTotal,
  index,
  totalArray,
}) => {
  MarketingTotalColum.propTypes = {
    datatoltal: PropTypes.oneOfType(PropTypes.array),
    emailDetect: PropTypes.string,
    open: PropTypes.bool,
    markter: PropTypes.string,
    handleOpen: PropTypes.func,
    getList: PropTypes.func,
    handlegetTotal: PropTypes.func,
    getData: PropTypes.func,
    index: PropTypes.number,
    totalArray: PropTypes.oneOfType(PropTypes.array),
  };
  MarketingTotalColum.defaultProps = {
    datatoltal: [],
    totalArray: [],
    emailDetect: '',
    open: false,
    markter: '',
    handleOpen,
    getList,
    handlegetTotal,
    getData,
    index: 0,
  };
  let totalContact = 0;
  let totalTested = 0;
  let avgTested = 0;
  let totalTrial = 0;
  let totalCustomer = 0;
  let totalImpression = 0;
  let totalGmv = 0;
  let totalRoi = 0;
  let aveRoi = 0;
  let totalCost = 0;
  let totalCostContact = 0;
  let totalCPM = 0;
  let totalContactStop = 0;
  let dataChildFilter = {};

  datatoltal.map(item => {
    totalContact = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countContacts,
      0,
    );
    totalImpression = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.impressions,
      0,
    );

    totalTested = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countTests,
      0,
    );
    avgTested = totalTested / item.dataitem.length || 0;

    totalTrial = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countTrial,
      0,
    );
    totalCost = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.spend,
      0,
    );
    totalCostContact = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.cpc,
      0,
    );
    totalContactStop = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.contact_stop,
      0,
    );
    totalCPM = item.dataitem.reduce((totalHolder, m) => totalHolder + m.gmv, 0);

    totalGmv = item.dataitem.reduce((totalHolder, m) => totalHolder + m.gmv, 0);
    totalRoi = item.dataitem.reduce((totalHolder, m) => totalHolder + m.roi, 0);
    aveRoi = isNaN(totalRoi / totalCost) ? '-' : totalRoi / totalCost;
    totalCustomer = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.customers,
      0,
    );
    dataChildFilter = item.dataitem.filter(it => it.utmEmail === emailDetect);

    item.dataitem.filter(it => {
      // console.log(emailDetect === item.utmEmail);
      // isOpen = emailDetect === it.utmEmail;
    });
  });

  const [markToggleSelected, setmarkToggleSelected] = useState(false);
  const totalData = new Array();
  totalData.push(
    totalCost,
    totalCostContact,
    totalImpression,
    totalContact,
    totalTested,
    totalTrial,
    totalCustomer,
    totalGmv,
    aveRoi,
    totalContactStop,
  );
  return (
    <>
      <tr>
        <td data-label="Marketer">
          <Accordion
            id={index}
            arrowDisplay="none"
            buttonProps={{
              style: {
                userSelect: 'text',
                textDecoration: 'none',
              },
            }}
            onToggle={isOpen => setmarkToggleSelected(isOpen)}
            buttonContent={
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                <ButtonIcon
                  onClick={() => {
                    // setEmail(emailDetect ? '' : item.label);
                    handleOpen(markter);
                  }}
                  style={{ backgroundColor: '#00C081', color: '#fff' }}
                  iconType={markToggleSelected ? 'arrowUp' : 'arrowDown'}
                />
                <span style={{ paddingLeft: '8px' }}>{markter}</span>
              </p>
            }
          />
        </td>
        {totalData.map(item => (
          <td data-label="Marketer">
            <td style={{ fontWeight: 'bold' }}>
              {item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </td>
          </td>
        ))}
      </tr>
      {markToggleSelected ? (
        <>
          {datatoltal.map(item =>
            item.dataitem.map(i => (
              <tr>
                <td
                  style={{
                    // paddingTop: '35px',
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <div
                    className="antoreeTooltip"
                    style={{ paddingLeft: '30px' }}
                  >
                    {`${i.campaignName.toLowerCase()}`}
                    <span className="antoreeTooltipText">
                      {`${i.campaignName.toLowerCase()}`}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    // paddingTop: '35px',
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.spend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.cpc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.impressions
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>

                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.countContacts
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.countTests
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.countTrial
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.customers
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.gmv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>{isNaN(i.spend / i.roi) ? '-' : i.spend / i.roi}</td>
                </td>
                <td
                  style={{
                    fontSize: '14px',
                    // lineHeight: '20px',
                    borderBottom: '1px solid #dddddd',
                  }}
                >
                  <td>
                    {i.contact_stop
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </td>
              </tr>
            )),
          )}
        </>
      ) : null}
    </>
  );
};

export default MarketingTotalColum;
