import React, { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import CustomDatePicker from './datepicker';
import { queryReport } from './queryReport';
import {
  ChartTitle,
  ReportWrapper,
  Subtitle,
  DatepickerRow,
  StyledTable,
} from './styles';

const LocationReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    let newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          users: row.metrics[0].values[0],
          country: row.dimensions[0],
          city: row.dimensions[1],
          region: row.dimensions[2],
        };
        newReportData.push(tempObj);
      }
    });
    setReportData(newReportData);
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: 'ga:users',
      dimensions: ['ga:country', 'ga:city', 'ga:region'],
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    );
  }, [startDate, endDate]);

  return (
    <ReportWrapper>
      <ChartTitle>Geografisk Område</ChartTitle>
      <DatepickerRow>
        <CustomDatePicker
          placeholder={'Start dato'}
          date={startDate}
          handleDateChange={(date) => setStartDate(date)}
        />
        <CustomDatePicker
          placeholder={'Slutt dato'}
          date={endDate}
          handleDateChange={(date) => setEndDate(date)}
        />
      </DatepickerRow>
      {reportData.length && (
        <StyledTable>
          <thead>
            <tr>
              <th>Antall</th>
              <th>Land</th>
              <th>By</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td>{row.users}</td>
                <td>{row.country}</td>
                <td>{row.city}</td>
                <td>{row.region}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </ReportWrapper>
  );
};

export default LocationReport;
