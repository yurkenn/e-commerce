import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import ProductDetail from './ProductDetail';
import NewProduct from './Products/new';
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
          <Route exact path={`${path}/products`} component={Products}></Route>
          <Route exact path={`${path}/products/new`} component={NewProduct}></Route>
          <Route path={`${path}/products/:product_id`} component={ProductDetail}></Route>
        </Switch>
      </Box>
    </>
  );
};

export default Admin;
