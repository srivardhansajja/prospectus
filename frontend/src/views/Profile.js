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
import React, {useEffect, useState } from 'react';
import Axios from 'axios';

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
} from "reactstrap";
// core components


const Profile = () => {
  
  const [UserData, setUserData] = useState('');
  const [UniData, setUniData] = useState('');
  // const [UniversityID, setUniversityID] = useState('');

  
  // const [Username, setUsername] = useState('');
  // const [Email, setEmail] = useState('');
  // const [Firstname, setFirstname] = useState('');
  // const [Lastname, setLastname] = useState('');
  // const [Major, setMajor] = useState('');
  // const [Picture, setPicture] = useState('');
  // const [Enrolled, setEnrolled] = useState('');
  
  

  let input_disable = document.getElementById("input_disable");

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    unisearch();
  }, [UserData]);
  // const getUserProfile = async () => {
  //   const resp = await axios.get('/user/profile', { withCredentials: true });
  //   const [info] = resp.data
  //   setUserData(info);
  // };
  
  const getUserProfile = () => {
      Axios.get('/user/profile', {
      withCredentials: true,
    }).then(
      (response) => {
        setUserData(response.data[0]);
        
        console.log(response.data[0]);
        // console.log(UserData[0].Name);
      }
    );
  }

  const disableSetting = () => {
    input_disable.disabled = !input_disable.disabled;
  }

  const unisearch = () => {
    Axios.get('/unisearch', {
      params: {UniversityID: UserData ? UserData.UniversityID_u : 0},
    }).then((response) => {
      setUniData(response.data[0]);
      console.log(response.data[0]);
    });
  };

  const updateUser = () => {
    
    // setUsername(document.getElementById("input-username").value)
    // setEmail(document.getElementById("input-email").value)
    // setFirstname(document.getElementById("input-first-name").value)
    // setLastname(document.getElementById("input-last-name").value)
    // setMajor(document.getElementById("input-Major").value)
    // setPicture(document.getElementById("input-Picture").value)
    // setEnrolled(document.getElementById("input-Enrolled").value)

    if(!input_disable.disabled)
    {
    let Username = document.getElementById("input-username").value
    let Email = document.getElementById("input-email").value
    let Firstname = document.getElementById("input-first-name").value
    let Lastname = document.getElementById("input-last-name").value
    let Major = document.getElementById("input-Major").value
    let Picture = document.getElementById("input-Picture").value
    let Enrolled = document.getElementById("input-Enrolled").value

    let UniCity = document.getElementById("input-UniCity").value
    let PrimeColor = document.getElementById("input-PrimeColor").value
    let SecondColor = document.getElementById("input-SecondColor").value
    let EmailDomain = document.getElementById("input-EmailDomain").value
    let UniversityName = document.getElementById("input-UniversityName").value

      

    
    Axios.put('/updateUser', {
      Email: Email ? Email : null,
      Major: Major ? Major : null,
      Name: Firstname + ' ' + Lastname,
      Picture: Picture ? Picture : null,
      UserId: Username ? Username : null,
      YearEnrolled: Enrolled ? Enrolled : null
    });

    Axios.put('/updateUniversity',{
      UniCity:UniCity ? UniCity : null,
      PrimeColor:PrimeColor ? PrimeColor: null,
      SecondColor:SecondColor ? SecondColor : null,
      EmailDomain:EmailDomain ? EmailDomain : null,
      UniName: UniversityName ? UniversityName : null,
      UniversityID: UniData.UniversityID ? UniData.UniversityID : null
    });

    }
    getUserProfile();
    input_disable.disabled = true;
  };

  return (
    <>
      <div
        className="header mt--8 pb-8 pt-5 pt-lg-6 d-flex align-items-center"
        style={{
          backgroundImage:
            "url(" +
            require("../assets/img/theme/profile-cover.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{UserData ? UserData.Name : ""}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={disableSetting}
              >
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
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt = "Unable to load. Place a new picture URL in My Account"
                        className="rounded-circle"
                        // src={UserData ? UserData.Picture : ""}
                        src = "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader> */}
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        {/* <span className="heading">22</span>
                        <span className="description">Friends</span> */}
                      </div>
                      <div>
                        {/* <span className="heading">10</span>
                        <span className="description">Photos</span> */}
                      </div>
                      <div>
                        {/* <span className="heading">89</span>
                        <span className="description">Comments</span> */}
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {UserData ? UserData.Name : ""}
                    <br></br>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Class of {UserData.YearEnrolled ? UserData.YearEnrolled : "'Update Your Year Enrolled'"}
                    <br></br>
                    Major: {UserData.Major ? UserData.Major : "'Update Your Major'"}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Student at
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {UniData ? UniData.UniversityName : "'Update Your University Name'"}
                    <br></br>
                    City: {UniData ? UniData.City : "'Update Your University City'"}
                    <br></br>
                    Primary Color: {UniData ? UniData.PrimaryColor : "'Update Your University's Primary Color'"}
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
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
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={updateUser}
                      size="sm"
                    >
                      Submit Changes
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <fieldset id = "input_disable" disabled="disabled">
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
                            defaultValue={UserData.UserId ? UserData.UserId : ""}
                            id="input-username"
                            disabled = "disabled"
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
                            defaultValue = {UserData.Email ? UserData.Email : ""}
                            // disabled = "disabled"
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
                            defaultValue={UserData.Name ? (UserData.Name).substr(0,(UserData.Name).indexOf(' ')) : ""}
                            // disabled = "disabled"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
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
                            defaultValue={UserData.Name ? (UserData.Name).substr((UserData.Name).indexOf(' ')+1) : ""}
                            // disabled = "disabled"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
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
                            defaultValue= {UserData.Picture ? UserData.Picture : ""}
                            // disabled = "disabled"
                            id="input-Picture"
                            placeholder="URL Link for Profile Picture"
                            type="text"
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
                            defaultValue= {UserData.Major ? UserData.Major : ""}
                            // disabled = "disabled"
                            id="input-Major"
                            placeholder="Enter Your Major"
                            type="text"
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
                            defaultValue= {UserData.YearEnrolled ? UserData.YearEnrolled : ""}
                            // disabled = "disabled"
                            id="input-Enrolled"
                            placeholder="Put The Year You Enrolled"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col> */}
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
                            defaultValue= {UniData? UniData.City : ""}
                            // disabled = "disabled"
                            id="input-UniCity"
                            placeholder="Univesity's City"
                            type="text"
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
                            defaultValue= {UniData? UniData.UniversityName : ""}
                            // disabled = "disabled"
                            id="input-UniversityName"
                            placeholder="Put Your University Name"
                            type="text"
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
                            defaultValue= {UniData? UniData.PrimaryColor : ""}
                            // disabled = "disabled"
                            id="input-PrimeColor"
                            placeholder="Put Your University's Primary Color"
                            type="text"
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
                            defaultValue= {UniData? UniData.SecondaryColor : ""}
                            // disabled = "disabled"
                            id="input-SecondColor"
                            placeholder="Put Your University's Secondary Color"
                            type="text"
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
                            defaultValue= {UserData? UserData.emailDomain : ""}
                            // disabled = "disabled"
                            id="input-EmailDomain"
                            placeholder="ex: illinois.edu"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
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
