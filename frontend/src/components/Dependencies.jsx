import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Graph from 'react-graph-vis';

import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';

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
      const [node] = nodes
      if (node) {
        setCid(node)
      }
    },
  };

  useEffect(() => {
    const getGraph = async (courseId) => {
      const resp = await Axios.get(`/relational/${courseId}`, { params: { depth: 1 } });
      const nodesArr = [courseId].concat(resp.data.map(({ to, from }) => [to, from]).flat())
      const nodes = [...new Set(nodesArr)].map(e => ({ id: e, label: `<b>${e}</b>`, color: '#555' }));
      const result = {
        graph: {
          nodes,
          edges: [
            ...resp.data
          ]
        }
      }
      console.log(result)
      setCourseGraph(result)
    }
    if (cid || props.courseid)
      getGraph(cid || props.courseid);
  }, [props.courseid, cid]);

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
            {courseGraph ?
              <Graph
                graph={courseGraph.graph}
                options={options}
                events={events}
                getNetwork={(network) => setNetwork(network)}
              />
              :
              <>
                <i>(Select a course to view dependencies and prerequisites)</i>
              </>
            }
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Dependencies;
