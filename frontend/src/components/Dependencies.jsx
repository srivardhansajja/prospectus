import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Graph from 'react-graph-vis';

import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';

const options = {
  height: '100%',
  interaction: {
    dragView: true,
    zoomView: true,
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
      direction: 'UD', // UD, DU, LR, RL
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
      const [node] = nodes;
      if (node) {
        setCid(node);
        props.coursesetter(node);
      }
    },
  };

  const getGraph = async (courseId) => {
    const resp = await Axios.get(`/relational/${courseId}`, {
      params: { depth: 2 },
    });
    const { edges, seen } = resp.data;
    const nodesArr = [courseId].concat(
      edges.map(({ to, from }) => [to, from]).flat()
    );
    const nodes = [...new Set(nodesArr)].map((e) => ({
      id: e,
      label: `<b>${e}</b>`,
      color: seen[0][e] ? '#2dce89' : e === courseId ? '#11cdef' : '#fb6340',
    }));
    // out edges, main node, in edges
    const result = {
      graph: {
        nodes,
        edges,
      },
    };
    setCourseGraph(result);
  };

  useEffect(() => {
    setCid(props.courseid);
  }, [props.courseid]);

  useEffect(() => {
    if (cid) getGraph(cid);
  }, [cid]);

  const resetGraph = () => {
    if (network != null) network.fit();
  };

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
          <CardBody style={{ textAlign: 'center' }}>
            {courseGraph ? (
              <Graph
                graph={courseGraph.graph}
                options={options}
                events={events}
                getNetwork={(network) => setNetwork(network)}
              />
            ) : (
              <>
                <i>(Select a course to view dependencies and prerequisites)</i>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Dependencies;
