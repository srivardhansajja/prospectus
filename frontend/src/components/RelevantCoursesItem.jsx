import React from 'react';

import { Progress } from 'reactstrap';

function barColor(gpa) {
  if (gpa > 3.33) return 'bg-gradient-success';
  else if (gpa > 2.66) return 'bg-gradient-warning';
  else return 'bg-gradient-danger';
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

const RelevantCoursesItem = (props) => {
  const avgGPA = props.averageGPA;

  var barCol, barValue, gpa, truncateValue;
  if (avgGPA !== 0.0) {
    barCol = barColor(avgGPA);
    barValue = ((avgGPA / 4.0) * 100).toString();
    gpa = avgGPA.toFixed(2).toString();
  } else {
    barCol = barColor(avgGPA);
    barValue = '0';
    gpa = 'NA';
  }
  if (props.page === 'dashboard') {
    truncateValue = 50;
  } else if (props.page === 'explore') {
    truncateValue = 25;
  }

  return (
    <>
      <tr>
        <th scope="row">{props.courseid}</th>
        <td>{truncate(props.coursename, truncateValue)}</td>
        <td>
          <div className="d-flex align-items-center">
            <span className="mr-2">{gpa}</span>
            <div>
              <Progress max="100" value={barValue} barClassName={barCol} />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RelevantCoursesItem;
