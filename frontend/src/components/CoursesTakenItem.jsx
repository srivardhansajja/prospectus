import React from 'react';
import Axios from 'axios';

const CoursesTakenItem = (props) => {
  const DeleteCourseFromCoursesTaken = (courseid) => {
    Axios.delete('/user/coursesTaken', {
      withCredentials: true,
      params: { courseid: courseid },
    }).then(
      (response) => {
        props.onChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <>
      <tr>
        <th scope="row">{props.courseid}</th>
        <td>{props.coursename}</td>
        <td>{props.credithours}</td>
        <td>
          <button
            value={props.courseid}
            type="button"
            onClick={(e) => DeleteCourseFromCoursesTaken(e.target.value)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CoursesTakenItem;
