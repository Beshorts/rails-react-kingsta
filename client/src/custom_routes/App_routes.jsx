import React from 'react';

import { Route } from 'react-router-dom';

// logic for custom routes to render correct layouts on login and signup path
const AppRoutes = ({
  component: Component, layout: Layout,
  ...rest}) =>  {
  return (
    <Route {...rest} render={(props) => (
      <Layout>
        <Component {...props}
        />
      </Layout>
    )} />
  );
}

export default AppRoutes;
