import React, { useState } from 'react';
import Axios from 'axios';

const CoursesPlannerItem = ({ courseid, coursename, credithours, semester, onChange }) => {
  const username = 'ajackson1';

  const DeleteCourseFromCoursesPlanner = (courseid, semester) => {
    console.log(username, courseid, semester);
    Axios.delete('/user/coursesPlanner', {
      withCredentials: true,
      params: { userid: username, courseid: courseid, semester: semester },
    }).then(
      (response) => {
        console.log(response.data);
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
        <td>{coursename}</td>
        <td>{credithours}</td>
        <td>
          <button
              value={courseid}
              type="button"
              onClick={(e) => DeleteCourseFromCoursesPlanner(e.target.value, semester)}
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

