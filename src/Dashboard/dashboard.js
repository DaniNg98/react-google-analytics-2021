import React, { useState } from 'react';
import Header from '../Components/header';
import PageviewsReport from './pageviewReport';
import InputField from '../Components/input';
import DayVisitsReport from './dayVisitsReport';
import EventReport from './eventReport';
import GeoReport from './geoReport';

const DashBoard = () => {
  const [viewID, setViewID] = useState(null);

  return (
    <>
      <Header />
      {viewID ? (
        <>
          <EventReport viewID={viewID} />
          <GeoReport viewID={viewID} />
          <DayVisitsReport
            metric={'ga:users'}
            title={'Users'}
            viewID={viewID}
          />
          <PageviewsReport viewID={viewID} />
        </>
      ) : (
        <InputField submitViewId={(id) => setViewID(id)} />
      )}
    </>
  );
};

export default DashBoard;
