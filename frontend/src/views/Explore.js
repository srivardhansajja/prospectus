/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from 'react';
import Axios from 'axios';

import departments from '../variables/depts.json';

import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components

import SearchResult from 'components/SearchResult.jsx';
import Wishlist from 'components/Wishlist';
import RelevantCourses from 'components/RelevantCourses.jsx';
import Dependencies from 'components/Dependencies.jsx';

const Explore = () => {
  const username = 'ajackson1';
  var keywords = '';
  var dept = '';
  var listsElements;

  const [resultsList, setResultsList] = useState([]);
  const [searchString, setSearchString] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  function generateAPIQuery(queryString) {
    setSearchString(queryString);
    const words = queryString.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (departments.depts.includes(words[i])) {
        dept = words[i] + '%';
        delete words[i];
        break;
      }
    }
    keywords = words.join('%');
    console.log(keywords);
    console.log(dept);
  }

  const getSearchResults = (queryString) => {
    generateAPIQuery(queryString.toLowerCase());

    Axios.get('/search', {
      params: { userid: username, keywords: keywords, dept: dept },
    }).then(
      (response) => {
        var results = response.data.data.map(function (item) {
          return [
            item['CourseID'],
            item['UniversityID_c'],
            item['Description'],
            item['CreditHours'],
            item['AverageGPA'],
            item['CourseDepartment'],
            item['CourseName'],
            item['num_students'],
          ];
        });
        setResultsList(results);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  var wishlist = <Wishlist />;
  var dependencies = <Dependencies courseid={selectedCourse} />;

  if (searchString.length > 0) {
    listsElements = resultsList.map((course) => (
      <SearchResult
        key={course[0]}
        courseid={course[0]}
        coursename={course[6]}
        description={course[2]}
        setCourse={setSelectedCourse}
      />
    ));
  } else {
    listsElements = (
      <div
        style={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'white',
          borderRadius: 20,
          textAlign: 'center',
          color: 'white',
          padding: 10,
          marginTop: 15,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        Search for courses based on name, department, description, subtopics or
        general education category
      </div>
    );
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col
            style={{ minHeight: '100px', height: '100px' }}
            className="mb-5 mb-xl-0"
            xl="3"
          >
            <Card
              style={{ height: '875px' }}
              className="bg-gradient-default shadow"
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <Form className="navbar-search navbar-search-dark ml-lg-auto">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            onChange={(e) => getSearchResults(e.target.value)}
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </div>
                </Row>
              </CardHeader>
              <CardBody
                style={{
                  padding: 0,
                  overflowY: 'auto',
                }}
              >
                {listsElements}
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Row style={{ padding: -10, marginBottom: -20 }}>
              {dependencies}
              {wishlist}
            </Row>
            <Row className="mt-5">
              <Col className="mb-4 mb-xl-0" xl="7">
                <Card className="shadow" style={{ minHeight: '100%' }}>
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Description</h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody style={{ textAlign: 'center' }}>
                    <i>(not relevant for Stage 4 demo)</i>
                  </CardBody>
                </Card>
              </Col>
              <RelevantCourses />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Explore;
