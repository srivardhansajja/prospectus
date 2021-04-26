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
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import DashboardLayout from 'layouts/Dashboard.js';
import AuthenticationLayout from 'layouts/Authentication.js';

export const Authorization = React.createContext([false, () => {}]);

// const ThemeContext = React.createContext(["light", () => {}]);

const App = () => {
  // const [isAuthorized, setIsAuthorized] = useState(false);
  const authHook = useState(false);

  return (
    <Authorization.Provider value={authHook}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/prospectus"
            render={(props) => <DashboardLayout {...props} />}
          />
          <Route
            path="/auth"
            render={(props) => <AuthenticationLayout {...props} />}
          />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </Authorization.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// export default authorization;
// export default App;
