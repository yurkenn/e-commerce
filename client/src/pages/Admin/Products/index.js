import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../../api';
import { Space, Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const Products = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery('admin:products', fetchProductList);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      console.log('deleted');
      queryClient.invalidateQueries('admin:products');
    },
  });

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteMutation.mutate(record._id)}
              onCancel={() => console.log('cancel')}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="/#">Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
  );
};

export default Products;
