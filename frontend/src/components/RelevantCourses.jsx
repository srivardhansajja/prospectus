import React, { useState } from 'react';
import Axios from 'axios';

import {
  Button,
  Card,
  CardHeader,
  Progress,
  Row,
  Table,
  Col,
} from 'reactstrap';

const RelevantCourses = () => {
  const [relCoursesList, setRelCoursesList] = useState([]);

  const getRelevantCourses = () => {
    // var keywords_ = searchBarText.replace(' ', '%');
    Axios.get('http://localhost:3001/user/relevantcourses', {
      withCredentials: true,
    }).then(
      (response) => {
        console.log(response.data.data);
        // data = JSON.parse(JSON.stringify(response.data));
        // console.log(data);
        var names = response.data.data.map(function (item) {
          return [item['CourseID_wish'], item['Description']];
        });
        console.log(names);
        setRelCoursesList();
      },
      (error) => {
        console.log(error);
      }
    );
    // return data;
  };

  return (
    <Col xl="5">
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Relevant Courses</h3>
            </div>
            <div className="col text-right">
              <Button color="info" onClick={getRelevantCourses} size="sm">
                Refresh
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Course ID</th>
              <th scope="col">Course Name</th>
              <th scope="col">Average GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">ECE 110</th>
              <td>Intro to Electronics</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">3.40</span>
                  <div>
                    <Progress
                      max="100"
                      value="85"
                      barClassName="bg-gradient-success"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">ECE 120</th>
              <td>Intro to Computing</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">3.04</span>
                  <div>
                    <Progress
                      max="100"
                      value="76"
                      barClassName="bg-gradient-warning"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">CS 125</th>
              <td>Intro to Comp Sci</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">3.45</span>
                  <div>
                    <Progress
                      max="100"
                      value="86"
                      barClassName="bg-gradient-success"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">CS 411</th>
              <td>Database Systems</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">3.51</span>
                  <div>
                    <Progress
                      max="100"
                      value="88"
                      barClassName="bg-gradient-success"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">ECE 313</th>
              <td>Probability in Engr</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">2.68</span>
                  <div>
                    <Progress
                      max="100"
                      value="67"
                      barClassName="bg-gradient-danger"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Col>
  );
};

export default RelevantCourses;
