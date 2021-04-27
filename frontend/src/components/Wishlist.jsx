import React, { useState, useContext } from 'react';
import Axios from 'axios';
import WishlistItem from './WishlistItem.jsx';

import { Authorization } from '../index.js';

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';

const Wishlist = (props) => {
  const username = 'ajackson1';
  var data;
  var searchBarText = '';

  const [wishlistList, setWishlistList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(0);
  const [isAuthorized, setIsAuthorized] = useContext(Authorization);

  const setSearchBarText = (text) => {
    searchBarText = text;
    getWishlist();
  };

  const getWishlist = () => {
    var keywords_ = searchBarText.replace(' ', '%');
    if (isAuthorized) {
      Axios.get('/user/wishlist', {
        withCredentials: true,
        params: { userid: username, keywords: keywords_ },
      }).then(
        (response) => {
          console.log(response.data.data);
          data = JSON.parse(JSON.stringify(response.data));
          console.log(data);

          var names = response.data.data.map(function (item) {
            return [item['CourseID_wish'], item['Description']];
          });

          setWishlistList(names);
        },
        (error) => {
          console.log(error);
        }
      );
      return data;
    }
    return [];
  };

  if (isLoaded === 0) {
    getWishlist();
    setIsLoaded(1);
  }
  if (props.page == 'dashboard') {
    var listsElements = wishlistList.map((course) => (
      <WishlistItem
        page="dashboard"
        key={course}
        courseid={course[0]}
        description={course[1]}
        onChange={getWishlist}
        setToggleRefresh={props.refresh}
      ></WishlistItem>
    ));
  } else if (props.page == 'explore') {
    var listsElements = wishlistList.map((course) => (
      <WishlistItem
        page="explore"
        key={course}
        courseid={course[0]}
        description={course[1]}
        onChange={props.refresh}
      ></WishlistItem>
    ));
  }

  return (
    <Col xl="4">
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">Courses Wishlist</h2>
            </div>
            <div className="form col text-right">
              <Button color="info" onClick={getWishlist} size="sm">
                Refresh
              </Button>
            </div>
          </Row>
          <Row className="pl-0 align-items-center">
            <div className="col">
              <Form
                className="mt-2 mb--1 navbar-search"
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
                      onChange={(e) => setSearchBarText(e.target.value)}
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
            height: 360,
          }}
        >
          <Table className="table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Course ID</th>
                <th scope="col" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  Description
                </th>
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

export default Wishlist;
