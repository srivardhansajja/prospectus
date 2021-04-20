import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Graph from 'react-graph-vis';

import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';

const exampleGraph = {
  graph: {
    nodes: [
      {
        id: 1,
        label: '<b>  ECE120 </b>',
        title: 'Introduction to Computing',
        color: '#fb6340',
      },
      { id: 2, label: '<b> ECE220 </b>', color: '#fb6340' },
      { id: 3, label: '<b> CS173 </b>', color: '#fb6340' },
      { id: 4, label: '<b> CS125 </b>', color: '#fb6340' },
      { id: 5, label: '<b> CS225 </b>', color: '#11cdef' },
      { id: 6, label: '<b> CS440 </b>', color: '#2dce89' },
      { id: 7, label: '<b> ECE374 </b>', color: '#2dce89' },
      { id: 8, label: '<b> ECE473 </b>', color: '#2dce89' },
      { id: 9, label: '<b> CS411 </b>', color: '#2dce89' },
      { id: 10, label: '<b> CS511 </b>', color: '#2dce89' },
      { id: 11, label: '<b> CS511 </b>', color: '#2dce89' },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 5 },
      { from: 4, to: 3 },
      { from: 3, to: 5 },
      { from: 5, to: 6 },
      { from: 5, to: 7 },
      { from: 7, to: 8 },
      { from: 5, to: 9 },
      { from: 9, to: 10 },
      { from: 5, to: 11 },
    ],
  },
};

const options = {
  height: '100%',
  interaction: {
    dragView: false,
    zoomView: false,
    hover: true,
  },
  layout: {
    improvedLayout: true,
    hierarchical: {
      enabled: true,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: false,
      edgeMinimization: false,
      parentCentralization: false,
      direction: 'LR', // UD, DU, LR, RL
      sortMethod: 'directed', // hubsize, directed
      shakeTowards: 'roots', // roots, leaves
    },
  },
  edges: {
    color: '#ffffff',
    width: 3,
  },
  nodes: {
    shape: 'circle',
    font: {
      multi: true,
      color: 'white',
      face: 'Open Sans',
      size: 20,
    },
  },
};

const Dependencies = (props) => {
  const [cid, setCid] = useState(props.courseid);
  const [network, setNetwork] = useState(null);
  const [courseGraph, setCourseGraph] = useState(null);

  const events = {
    doubleClick: ({ nodes }) => {
      console.log(nodes);
      if (nodes.length > 0) {
        let cid = courseGraph.graph.nodes
          .find((o) => o.id === parseInt(nodes))
          .label.split(' ')[1];
        setCid(cid);
      }
    },
  };

  useEffect(() => {
    console.log(props.courseid);
    if (props.courseid != null) getGraph(props.courseid);
  }, [props.courseid, cid]);

  const resetGraph = () => {
    if (network != null) network.fit();
  };

  const getGraph = (courseid_) => {
    // Axios.get('http://localhost:3001/graph', {
    //   params: { courseid: courseid_ },
    // }).then(
    //   (response) => {
    //     setCourseGraph(response.data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    // delete after implementing API
    if (courseid_ != null) {
      const exampleGraph_ = JSON.parse(JSON.stringify(exampleGraph));
      setCourseGraph(exampleGraph_);
    }
    ///////////////////

    if (network != null) network.fit();
  };

  var graphHTML;
  if (courseGraph == null) {
    graphHTML = (
      <>
        <i>(Select a course to view dependencies and prerequisites)</i>
      </>
    );
  } else {
    graphHTML = (
      <Graph
        graph={courseGraph.graph}
        options={options}
        events={events}
        getNetwork={(network) => setNetwork(network)}
      />
    );
  }

  return (
    <>
      <Col className="mb-5 mb-xl-0" xl="8">
        <Card className="bg-gradient-default shadow" style={{ height: '100%' }}>
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="text-white mb-0">Course Dependencies</h2>
              </div>
              <div className="form col text-right">
                <Button
                  color="info"
                  size="sm"
                  onClick={() => {
                    resetGraph();
                  }}
                >
                  Reset View
                </Button>
              </div>
            </Row>
          </CardHeader>
          <CardBody style={{ textAlign: 'center' }}>{graphHTML}</CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Dependencies;
