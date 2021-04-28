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
import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { Authorization } from '../index.js';

const Profile = () => {
  const history = useHistory();
  const isAuthorized = useContext(Authorization)[0];

  if (!isAuthorized) history.push('/auth/login');

  const [UserData, setUserData] = useState('');
  const [UniData, setUniData] = useState('');
  const [InputDisable, setInputDisable] = useState(true);

  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Major, setMajor] = useState('');
  const [Picture, setPicture] = useState('');
  const [Enrolled, setEnrolled] = useState('');

  const [UniCity, setUniCity] = useState('');
  const [PrimeColor, setPrimeColor] = useState('');
  const [SecondColor, setSecondColor] = useState('');
  const [EmailDomain, setEmailDomain] = useState('');
  const [UniversityName, setUniversityName] = useState('');

  // const [submitButton, setSubmitButton] = useState(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    unisearch();
    setMajor(UserData ? UserData.Major : '');
    setFirstname(
      UserData.Name ? UserData.Name.substr(0, UserData.Name.indexOf(' ')) : ''
    );
    setLastname(
      UserData.Name ? UserData.Name.substr(UserData.Name.indexOf(' ') + 1) : ''
    );
    setPicture(UserData ? UserData.Picture : '');
    setEnrolled(UserData.YearEnrolled ? UserData.YearEnrolled : '');
    // eslint-disable-next-line
  }, [UserData]);

  useEffect(() => {
    setUniversityName(UniData ? UniData.UniversityName : '');
    setEmailDomain(UniData ? UniData.emailDomain : '');
    setSecondColor(UniData ? UniData.SecondaryColor : '');
    setPrimeColor(UniData ? UniData.PrimaryColor : '');
    setUniCity(UniData ? UniData.City : '');
  }, [UniData]);

  const getUserProfile = () => {
    Axios.get('/user/profile', {
      withCredentials: true,
    }).then((response) => {
      setUserData(response.data[0]);
    });
  };

  const disableSetting = () => {
    // setSubmitButton(
      
    // );
    setInputDisable(!InputDisable);
  };

  const unisearch = () => {
    Axios.get('/unisearch', {
      params: { UniversityID: UserData ? UserData.UniversityID_u : 0 },
    }).then((response) => {
      setUniData(response.data[0]);
    });
  };

  const MajorHandler = (e) => {
    setMajor(e.target.value);
  };

  const FirstnameHandler = (e) => {
    setFirstname(e.target.value);
  };

  const LastnameHandler = (e) => {
    setLastname(e.target.value);
  };

  const PictureHandler = (e) => {
    setPicture(e.target.value);
  };

  const EnrolledHandler = (e) => {
    setEnrolled(e.target.value);
  };

  const UniCityHandler = (e) => {
    setUniCity(e.target.value);
  };

  const PrimeColorHandler = (e) => {
    setPrimeColor(e.target.value);
  };

  const SecondColorHandler = (e) => {
    setSecondColor(e.target.value);
  };

  const EmailDomainHandler = (e) => {
    setEmailDomain(e.target.value);
  };

  const UniversityNameHandler = (e) => {
    setUniversityName(e.target.value);
  };

  const updateUser = () => {
    if (!InputDisable) {
      let Username = UserData.UserId;

      Axios.put('/updateUser', {
        Major: Major ? Major : null,
        Name: Firstname + ' ' + Lastname,
        Picture: Picture ? Picture : null,
        UserId: Username,
        YearEnrolled: Enrolled ? Enrolled : null,
      });
      Axios.put('/updateUniversity', {
        UniCity: UniCity ? UniCity : null,
        PrimeColor: PrimeColor ? PrimeColor : null,
        SecondColor: SecondColor ? SecondColor : null,
        EmailDomain: EmailDomain ? EmailDomain : null,
        UniName: UniversityName ? UniversityName : '',
        UniversityID: UniData.UniversityID,
      });
    }
    getUserProfile();
    setInputDisable(true);
    // setSubmitButton(null);
  };

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://i.stack.imgur.com/34AD2.jpg';
  };

  return (
    <>
      <div
        className="header mt--8 pb-8 pt-5 pt-lg-6 d-flex align-items-center"
        style={{
          backgroundImage:
            'url(' +
            'https://images.freeimages.com/images/large-previews/11a/perfect-blue-1198894.jpg' +
            ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                Hi {UserData ? UserData.Name : ''}!
              </h1>
              <p className="text-white mt-0 mb-5">
                This is your Prospectus profile page. You can update your
                information, and add a picture to make it more personalized.
              </p>
              <Button color="info" onClick={disableSetting}>
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {/* <a onClick={(e) => e.preventDefault()}> */}
                    <img
                      alt="Unable to load. Place a new URL in My Account"
                      className="rounded-circle"
                      src={UserData ? UserData.Picture : ''}
                      // src = {"google.com"}
                      onError={addDefaultSrc}
                    />
                    {/* </a> */}
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {UserData ? UserData.Name : ''}
                    <br></br>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Class of{' '}
                    {UserData.YearEnrolled
                      ? UserData.YearEnrolled
                      : "'Update Your Year Enrolled'"}
                    <br></br>
                    Major:{' '}
                    {UserData.Major ? UserData.Major : "'Update Your Major'"}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Student at
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {UniData
                      ? UniData.UniversityName
                      : "'Update Your University Name'"}
                    <br></br>
                    City:{' '}
                    {UniData ? UniData.City : "'Update Your University City'"}
                    <br></br>
                    Primary Color:{' '}
                    {UniData
                      ? UniData.PrimaryColor
                      : "'Update Your University's Primary Color'"}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" disabled = {InputDisable} onClick={updateUser} size="sm">
                      Submit Changes
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <fieldset disabled={InputDisable}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              UserID
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.UserId ? UserData.UserId : ''
                              }
                              id="input-username"
                              disabled="disabled"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.Email ? UserData.Email : ''
                              }
                              disabled="disabled"
                              id="input-email"
                              placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.Name
                                  ? UserData.Name.substr(
                                      0,
                                      UserData.Name.indexOf(' ')
                                    )
                                  : ''
                              }
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={FirstnameHandler}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.Name
                                  ? UserData.Name.substr(
                                      UserData.Name.indexOf(' ') + 1
                                    )
                                  : ''
                              }
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={LastnameHandler}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      Profile Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Picture"
                            >
                              Profile Picture Link
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.Picture ? UserData.Picture : ''
                              }
                              id="input-Picture"
                              placeholder="URL Link for Profile Picture"
                              type="text"
                              value={Picture}
                              onChange={PictureHandler}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Major"
                            >
                              Major
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.Major ? UserData.Major : ''
                              }
                              id="input-Major"
                              placeholder="Enter Your Major"
                              type="text"
                              onChange={MajorHandler}
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Enrolled"
                            >
                              Year Enrolled
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UserData.YearEnrolled
                                  ? UserData.YearEnrolled
                                  : ''
                              }
                              id="input-Enrolled"
                              placeholder="Put The Year You Enrolled"
                              type="text"
                              onChange={EnrolledHandler}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      University Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-UniCity"
                            >
                              University City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={UniData ? UniData.City : ''}
                              id="input-UniCity"
                              placeholder="Univesity's City"
                              type="text"
                              onChange={UniCityHandler}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-UniversityName"
                            >
                              University Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UniData ? UniData.UniversityName : ''
                              }
                              id="input-UniversityName"
                              placeholder="Put Your University Name"
                              type="text"
                              onChange={UniversityNameHandler}
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-PrimeColor"
                            >
                              Primary Color
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={UniData ? UniData.PrimaryColor : ''}
                              id="input-PrimeColor"
                              placeholder="Put Your University's Primary Color"
                              type="text"
                              onChange={PrimeColorHandler}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-SecondColor"
                            >
                              Secondary Color
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                UniData ? UniData.SecondaryColor : ''
                              }
                              id="input-SecondColor"
                              placeholder="Put Your University's Secondary Color"
                              type="text"
                              onChange={SecondColorHandler}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-EmailDomain"
                            >
                              Email Domain
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={UniData ? UniData.emailDomain : ''}
                              id="input-EmailDomain"
                              placeholder="ex: illinois.edu"
                              type="text"
                              onChange={EmailDomainHandler}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  </fieldset>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
