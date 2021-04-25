import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Badge, Card, CardBody, Col } from 'reactstrap';

const CourseDescription = (props) => {
  const [description, setDescription] = useState(null);

  useEffect(() => {
    console.log(props.courseid);
    getDescription();
  }, [props.courseid]);

  const AddCourseToWishlist = (courseid) => {
    Axios.post(
      '/user/wishlist',
      {
        courseid: courseid,
      },
      { withCredentials: true }
    ).then(
      (response) => {
        if (response.data.status === 400) {
          window.alert(
            `This course with courseid "${courseid}" is already in your wishlist`
          );
        } else {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const AddCourseToCoursesTaken = (courseid) => {
    Axios.post(
      '/user/coursesTaken',
      {
        courseid: courseid,
      },
      { withCredentials: true }
    ).then(
      (response) => {
        if (response.data.status === 400) {
          window.alert(
            `This course with courseid "${courseid}" is already in your list of taken courses`
          );
        } else {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function getDescription() {
    Axios.get('/user/coursedescription', {
      params: { courseid: props.courseid },
    }).then(
      (response) => {
        var names = response.data.data.map(function (item) {
          return [
            item['AverageGPA'],
            item['CourseDepartment'],
            item['CourseID'],
            item['CourseName'],
            item['CreditHours'],
            item['Description'],
          ];
        });
        names = names[0];

        if (response.data.length > 0) {
          console.log(response.data);
          console.log(names);
          setDescription(names);
          console.log(description);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  var desc;
  if (!description) {
    desc = (
      <CardBody style={{ textAlign: 'center' }}>
        <i>(Select a course to view dependencies and prerequisites)</i>
      </CardBody>
    );
  } else {
    let avgGpa = 'Not Available for this class';

    if (description[0] != 0) {
      avgGpa = description[0].toFixed(2).toString();
    }

    desc = (
      <CardBody>
        <div className="row">
          <div className="col">
            <Badge
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                backgroundColor: '#FB6340',
              }}
              color="warning"
            >
              <h5
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  color: 'white',
                  fontWeight: 800,
                }}
              >
                {description[2]}
              </h5>
            </Badge>
            &nbsp;&nbsp;
            <b>{description[3]}</b>
          </div>
          <div className="col">
            <button
              value={props.courseid}
              type="button"
              className="btn btn-sm btn-success float-right"
              onClick={(e) => AddCourseToWishlist(e.target.value)}
            >
              + Wishlist
            </button>
            <button
              value={props.courseid}
              type="button"
              className="btn btn-sm btn-success float-right"
              onClick={(e) => AddCourseToCoursesTaken(e.target.value)}
              style={{ marginRight: 10 }}
            >
              + Taken
            </button>
          </div>
        </div>
        <br />
        <p>
          Department: <b>{description[2]}</b>
        </p>
        <p>
          Credits:{' '}
          <b>
            <u>{description[4].substring(0, description[4].length - 1)}</u>
          </b>
          , Average GPA:{' '}
          <b>
            <u>{avgGpa}</u>
          </b>
        </p>

        <p>{description[5]}</p>
      </CardBody>
    );
  }

  return (
    <>
      <Col className="mb-4 mb-xl-0" xl="7">
        <Card className="shadow" style={{ minHeight: '100%' }}>
          {desc}
        </Card>
      </Col>
    </>
  );
};

export default CourseDescription;
