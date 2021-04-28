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
import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import { useHistory } from 'react-router-dom';

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
import CourseDescription from 'components/CourseDescription.jsx';
import { Authorization } from '../index.js';

const Explore = () => {
  const history = useHistory();
  const isAuthorized = useContext(Authorization)[0];

  if (!isAuthorized) history.push('/auth/login');

  const [searchTerm, setSearchTerm] = useState('');
  const [resultsList, setResultsList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const refresh = useState(false);

  useEffect(() => {
    const getSearchResults = async (q) => {
      if (!q) return;
      const resp = await Axios.get('/search', {
        params: { q: q.toLowerCase() },
      });
      setResultsList(resp.data);
    };
    getSearchResults(searchTerm);
  }, [searchTerm]);

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
              style={{ height: '840px' }}
              className="bg-gradient-default shadow"
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <Form
                      className="navbar-search navbar-search-dark ml-lg-auto"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                {searchTerm.length ? (
                  resultsList.map(({ CourseID, CourseName, Description }) => (
                    <SearchResult
                      key={CourseID}
                      refresh={refresh}
                      courseid={CourseID}
                      coursename={CourseName}
                      description={Description}
                      setCourse={setSelectedCourse}
                    />
                  ))
                ) : (
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
                    Search for courses based on name, department, description,
                    subtopics or general education category
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Row style={{ padding: -10, marginBottom: -20 }}>
              <Dependencies
                courseid={selectedCourse}
                coursesetter={setSelectedCourse}
              />
              <Wishlist page="explore" refresh={refresh} />
            </Row>
            <Row className="mt-5">
              <CourseDescription courseid={selectedCourse} refresh={refresh} />
              <RelevantCourses page="explore" />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Explore;
