import React, { useState } from 'react';
import Axios from 'axios';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from 'reactstrap';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

const WishlistItem = (props) => {
  const username = 'ajackson1';

  const [courseDesc, setCourseDesc] = useState('');
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const DeleteCourseFromWishlist = (courseid) => {
    console.log(username, courseid);
    Axios.delete('/user/wishlist', {
      params: { userid: username, courseid: courseid },
    }).then(
      (response) => {
        console.log(response.data);
        props.onChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const UpdateCourseInWishlist = () => {
    console.log(username, props.courseid, courseDesc);
    Axios.post('/user/wishlist/update', {
      userid: username,
      courseid: props.courseid,
      desc: courseDesc,
    }).then(
      (response) => {
        console.log(response.data);
        props.onChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
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
          <Button color="danger" onClick={toggle}>
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
          {truncate(props.description, 20)}
        </td>
        <td>
          <button
            value={props.courseid}
            style={{ paddingLeft: 6, paddingRight: 6, borderRadius: 100 }}
            type="button"
            onClick={toggle}
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
        </td>
      </tr>
    </>
  );
};

export default WishlistItem;
