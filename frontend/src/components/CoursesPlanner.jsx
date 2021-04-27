import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import CoursesPlannerItem from './CoursesPlannerItem.jsx';
import { Authorization } from '../index.js';

import { Card, CardHeader, CardBody, Row, Table, Col } from 'reactstrap';
import { data } from 'jquery';

const CoursesPlanner = ({ semester, refresh }) => {
  const username = 'ajackson1';

  const [CoursesPlannerList, setCoursesPlannerList] = useState([]);
  const [isAuthorized, setIsAuthorized] = useContext(Authorization);

  const getCoursesPlanner = () => {
    if (isAuthorized) {
      Axios.get('/user/coursesPlanner', {
        withCredentials: true,
        params: { userid: username, semester: semester },
      }).then(
        (response) => {
          var names = response.data.data.map(function (item) {
            return [
              item['CourseID_cp'],
              item['CourseName'],
              item['CreditHours'],
            ];
          });
          setCoursesPlannerList(names);
        },
        (error) => {
          console.log(error);
        }
      );
      return data;
    }
    return [];
  };

  useEffect(() => {
    getCoursesPlanner();
  }, []);

  useEffect(() => {
    getCoursesPlanner();
  }, [refresh.refresh[0]]);

  var listsElements = CoursesPlannerList.map((course) => (
    <CoursesPlannerItem
      key={course}
      courseid={course[0]}
      coursename={course[1]}
      credithours={course[2]}
      semester={semester}
      onChange={getCoursesPlanner}
    ></CoursesPlannerItem>
  ));

  return (
    <Col xl="6">
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">{semester}</h3>
            </div>
          </Row>
        </CardHeader>
        <CardBody
          style={{
            padding: 0,
            overflowY: 'auto',
            height: 290,
          }}
        >
          <Table className="table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Course Name</th>
                <th scope="col">Credits</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{listsElements}</tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CoursesPlanner;
