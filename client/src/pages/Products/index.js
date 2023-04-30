import React from 'react';
import { Box, Button, Grid } from '@chakra-ui/react';
import Card from '../../components/Card';
import { useInfiniteQuery } from 'react-query';
import { fetchProductList } from '../../api';

const Products = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery('product', fetchProductList, {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePagesExist = lastGroup?.length === 12;

        if (!morePagesExist) {
          return;
        }

        return allGroups.length + 1;
      },
    });

  if (status === 'loading') return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'10'}>
        <Button
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Box>
      <Box>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</Box>
    </div>
  );
};

export default Products;
