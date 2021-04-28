import React from 'react';
import Axios from 'axios';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

function trimCreditHours(str) {
  return str.substring(0, str.lastIndexOf(' '));
}

const CoursesPlannerItem = ({
  courseid,
  coursename,
  credithours,
  semester,
  onChange,
}) => {
  const DeleteCourseFromCoursesPlanner = (courseid, semester) => {
    Axios.delete('/user/coursesPlanner', {
      withCredentials: true,
      params: { courseid: courseid, semester: semester },
    }).then(
      (response) => {
        onChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <tr>
        <th scope="row">{courseid}</th>
        <td>{truncate(coursename, 28)}</td>
        <td>{trimCreditHours(credithours)}</td>
        <td>
          <button
            value={courseid}
            type="button"
            onClick={(e) =>
              DeleteCourseFromCoursesPlanner(e.target.value, semester)
            }
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CoursesPlannerItem;
