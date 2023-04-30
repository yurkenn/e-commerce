import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
const Admin = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={url}>Home</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to={`${url}/orders`}>Orders</Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Link to={`${url}/products`}>Products</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mt={10}>
        <Switch>
          <Route exact path={path} component={Home}></Route>
          <Route path={`${path}/orders`} component={Orders}></Route>
          <Route path={`${path}/products`} component={Products}></Route>
        </Switch>
      </Box>
    </>
  );
};

export default Admin;
