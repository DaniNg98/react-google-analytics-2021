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

const EventActionReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    let newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          events: row.metrics[0].values[0],
          label: row.dimensions[0],
          category: row.dimensions[1],
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
      metrics: 'ga:totalEvents',
      dimensions: ['ga:eventLabel', 'ga:eventCategory'],
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
      <ChartTitle>Aktivitet på siden</ChartTitle>
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
              <th>Totale klikk</th>
              <th>Navnelapp</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td>{row.events}</td>
                <td>{row.label}</td>
                <td>{row.category}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </ReportWrapper>
  );
};

export default EventActionReport;
