import React, { useState } from 'react';
import Axios from 'axios';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

const WishlistItem = (props) => {
  const [courseDesc, setCourseDesc] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalPlanner, setModalPlanner] = useState(false);

  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const togglePlanner = () => setModalPlanner(!modalPlanner);

  const DeleteCourseFromWishlist = (courseid) => {
    Axios.delete('/user/wishlist', {
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

  const AddCoursetoCoursesPlanner = (courseid, semester) => {
    togglePlanner();
    Axios.post(
      '/user/coursesPlanner',
      {
        courseid: courseid,
        semester: semester,
      },
      { withCredentials: true }
    ).then(
      (response) => {
        if (response.data.status === 400) {
          window.alert(
            `This course with courseid "${courseid}" is already in your course planner`
          );
        }
        props.setToggleRefresh.refresh[1](!props.setToggleRefresh.refresh[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const UpdateCourseInWishlist = () => {
    toggleUpdate();
    Axios.post(
      '/user/wishlist/update',
      {
        courseid: props.courseid,
        desc: courseDesc,
      },
      { withCredentials: true }
    ).then(
      (response) => {
        props.onChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  var truncateValue;
  if (props.page === 'dashboard') {
    truncateValue = 50;
  } else if (props.page === 'explore') {
    truncateValue = 20;
  }
  let addButton = <></>;
  if (props.page === 'dashboard') {
    addButton = (
      <button
        value={props.courseid}
        type="button"
        onClick={togglePlanner}
        className="btn btn-sm btn-success"
      >
        + Planner
      </button>
    );
  }
  return (
    <>
      <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <div
          className=""
          style={{
            paddingTop: 20,
            margin: 'auto',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 15,
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
          }}
        >
          <h3 style={{}}>Update Course in your Wishlist</h3>
        </div>

        <ModalBody>
          <Label for="exampleEmail">Course ID</Label>
          <Input
            type="text"
            name="courseid"
            id="courseid"
            className="mb-3"
            value={props.courseid}
            disabled
          />

          <Label for="exampleEmail">Description</Label>
          <Input
            type="text"
            name="desc"
            id="desc"
            className="mb--3"
            onChange={(e) => setCourseDesc(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={UpdateCourseInWishlist}>
            Update
          </Button>{' '}
          <Button color="danger" onClick={toggleUpdate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalPlanner} toggle={togglePlanner}>
        <div
          className=""
          style={{
            paddingTop: 20,
            margin: 'auto',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 15,
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
          }}
        >
          <h3 style={{}}>Add class to your planner</h3>
        </div>
        <ModalBody>
          <Row className="align-items-center">
            <Col className="align-items-center">
              <Button
                style={{ marginLeft: 20 }}
                value={props.courseid}
                color="success"
                onClick={(e) =>
                  AddCoursetoCoursesPlanner(e.target.value, 'FA2021')
                }
              >
                Add to Fall Semester
              </Button>{' '}
              <Button
                value={props.courseid}
                color="success"
                onClick={(e) =>
                  AddCoursetoCoursesPlanner(e.target.value, 'SP2021')
                }
              >
                Add to Spring Semester
              </Button>{' '}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={togglePlanner}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <tr style={{ verticalAlign: 'center' }}>
        <th style={{ verticalAlign: 'middle' }} scope="row">
          {props.courseid}
        </th>
        <td
          style={{ verticalAlign: 'middle', paddingLeft: 0, paddingRight: 0 }}
        >
          {truncate(props.description, truncateValue)}
        </td>
        <td>
          <button
            value={props.courseid}
            style={{ paddingLeft: 6, paddingRight: 6, borderRadius: 100 }}
            type="button"
            onClick={toggleUpdate}
            className="btn btn-sm btn-primary"
          >
            <img
              alt="Update"
              src={require('../assets/img/edit_icon.png').default}
            ></img>
          </button>
          <button
            value={props.courseid}
            type="button"
            onClick={(e) => DeleteCourseFromWishlist(e.target.value)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
          {addButton}
        </td>
      </tr>
    </>
  );
};

export default WishlistItem;
