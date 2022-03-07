/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Accordion, ButtonIcon, Text, PageContent } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './MarketingTable.scss';
import MarketingTotalColum from './MarketingTotalColum';
import MarketingToltalAll from './MarketingToltalAll';

const MarketingReportTable = ({
  datatable,
  emailUtm,
  dateFrom,
  dateTo,
  pageIndex,
  pageSize,
  hanldegetEmail,
  onUpdateCampaignActive,
  currencyFormatter,
  divideIfNotZero,
  isLoading,
  onTableChangeHandler,
  data,
  decimalFormat,
  formatPercentage,
  handleRemove,
  getList,
}) => {
  MarketingReportTable.propTypes = {
    datatable: PropTypes.oneOfType([PropTypes.array]),
    data: PropTypes.oneOfType([PropTypes.array]),
    emailUtm: PropTypes.string,
    dateFrom: PropTypes.string,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
    dateTo: PropTypes.string,
    handleRemove: PropTypes.func,
    getList: PropTypes.func,
    onTableChangeHandler: PropTypes.func,
    hanldegetEmail: PropTypes.func,
    onUpdateCampaignActive: PropTypes.func,
    currencyFormatter: PropTypes.func,
    isLoading: PropTypes.bool,
    formatPercentage: PropTypes.func,
    divideIfNotZero: PropTypes.func,
    decimalFormat: PropTypes.func,
  };
  MarketingReportTable.defaultProps = {
    emailUtm: [],
    datatable: [],
    dateTo: '',
    dateFrom: '',
    hanldegetEmail,
    handleRemove,
    pageIndex: 0,
    pageSize: 0,
    getList,
    onTableChangeHandler,
    onUpdateCampaignActive,
    currencyFormatter,
    isLoading: false,
    formatPercentage,
    divideIfNotZero,
    decimalFormat,
    data,
  };
  const [open, setOpen] = useState(false);

  const [emailDetect, setEmail] = useState('');
  const [emailIndex, setEmailindex] = useState(0);

  const [total, setTotal] = useState([]);

  const handleOpen = dataemail => {
    setEmail(emailDetect ? '' : dataemail);
    setOpen(!open);
  };
  const handleIndex = dataindex => {
    setEmailindex(dataindex);
    // setOpen(!open);
  };
  const handlegetTotal = datatotal => {
    setTotal(datatotal);
  };

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th className="tablehead">Marketer</th>
          <th className="tablehead">Cost</th>

          <th className="tablehead">Cost/Contact</th>
          <th className="tablehead">Impression</th>

          {/* <th>CPM</th> */}
          <th className="tablehead">Contact</th>
          <th className="tablehead"> Tested</th>
          <th className="tablehead">Trial</th>
          <th className="tablehead">Customers</th>
          <th className="tablehead">GMV</th>
          <th className="tablehead">ROI</th>
          <th className="tablehead">Contact Stop</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ paddingLeft: '35px', fontWeight: '600' }}>Tất cả</td>
          <MarketingToltalAll data={data} />
        </tr>
        {data.map((item, index) => (
          <MarketingTotalColum
            getList={getList}
            open={open}
            index={index}
            handleIndex={handleIndex}
            emailIndex={emailIndex}
            handlegetTotal={handlegetTotal}
            handleOpen={handleOpen}
            markter={item.label}
            emailDetect={emailDetect}
            datatoltal={data.filter(i => i.label === item.label)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MarketingReportTable;
