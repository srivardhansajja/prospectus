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
import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import ProspectusNavbar from 'components/ProspectusNavbar.jsx';
import Footer from 'components/Footer.jsx';

import routes from 'routes.js';

const Dashboard = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/prospectus') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <ProspectusNavbar {...props} />
        <div className="header bg-gradient-info pb-4 pt-5 pt-md-7" />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/prospectus/dashboard" />
        </Switch>
        <Container fluid>
          <footer className="footer">
            <hr style={{ marginTop: -20 }} />
            <Footer />
          </footer>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
