import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const MarketingToltalAll = ({ data }) => {
  MarketingToltalAll.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
  };
  MarketingToltalAll.defaultProps = {
    data: [],
  };
  let totalContact = 0;
  let totalTested = 0;
  let avgTested = 0;
  let totalTrial = 0;
  let totalCustomer = 0;
  const isOpen = true;
  let totalImpression = 0;
  let totalGmv = 0;
  let totalRoi = 0;
  let aveRoi = 0;
  let totalCost = 0;
  let totalCostContact = 0;
  let totalCPM = 0;
  let totalContactStop = 0;

  const totalContactAllarr = [];
  const totalCostArr = [];
  const totalImpressionarr = [];
  const totalCustomerarr = [];
  const totalTestedarr = [];
  const totalGmvarr = [];
  const totalTrialarr = [];
  const totalRoiArr = [];
  const totalContactStoparr = [];

  data.map(item => {
    totalContact = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countContacts,
      0,
    );
    totalContactAllarr.push(totalContact || 0);

    totalImpression = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.impressions,
      0,
    );
    totalImpressionarr.push(totalImpression);
    totalTested = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countTests,
      0,
    );
    totalTestedarr.push(totalTested);
    avgTested = totalTested / item.dataitem.length || 0;

    totalTrial = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.countTrial,
      0,
    );
    totalTrialarr.push(totalTrial);
    totalCost = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.spend,
      0,
    );
    totalCostArr.push(totalCost);
    totalCostContact = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.cpc,
      0,
    );

    totalContactStop = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.contact_stop,
      0,
    );
    totalContactStoparr.push(totalContactStop);
    totalCPM = item.dataitem.reduce((totalHolder, m) => totalHolder + m.gmv, 0);

    totalGmv = item.dataitem.reduce((totalHolder, m) => totalHolder + m.gmv, 0);
    totalGmvarr.push(totalGmv);
    totalRoi = item.dataitem.reduce((totalHolder, m) => totalHolder + m.roi, 0);
    aveRoi = totalCost / totalRoi;
    totalRoiArr.push(aveRoi);
    totalCustomer = item.dataitem.reduce(
      (totalHolder, m) => totalHolder + m.customers,
      0,
    );
    totalCustomerarr.push(totalCustomer);
  });

  const getTotalAll = arr => {
    let sum = 0;
    for (let i = 0; i < arr.length; i += 1) {
      sum += arr[i];
    }
    return sum;
  };
  //   const totalContactAlls = getTotalAll(totalContactAllarr);

  const totalCostCount = useMemo(() => getTotalAll(totalCostArr), [
    totalCostArr,
  ]);

  const totalContactAlls = useMemo(() => getTotalAll(totalContactAllarr), [
    totalContactAllarr,
  ]);
  const totalImpressionCount = useMemo(() => getTotalAll(totalImpressionarr), [
    totalImpressionarr,
  ]);

  const totalContactStopCount = useMemo(
    () => getTotalAll(totalContactStoparr),
    [totalContactStoparr],
  );
  const totalTestedCount = useMemo(() => getTotalAll(totalTestedarr), [
    totalTestedarr,
  ]);
  const totalTrialCount = useMemo(() => getTotalAll(totalTrialarr), [
    totalTrialarr,
  ]);

  const totalCustomerCount = useMemo(() => getTotalAll(totalCustomerarr), [
    totalCustomerarr,
  ]);

  const totalGmvCount = useMemo(() => getTotalAll(totalGmvarr), [totalGmvarr]);
  //   console.log(totalRoiArr);
  const totalCostContactcount = totalCostCount / totalContactAlls;
  return (
    <>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalCostCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalCostContactcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>

      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalImpressionCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>

      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalContactAlls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalTestedCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalTrialCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalCustomerCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalGmvCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>

      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>-</td>

      <td style={{ fontWeight: '600', paddingLeft: '30px' }}>
        {totalContactStopCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
    </>
  );
};

export default MarketingToltalAll;
