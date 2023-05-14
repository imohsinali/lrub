import { Flex } from '@chakra-ui/react'
import React from 'react'
import PRight from './Pagination'

const PaginationTop = ({land,postsPerPage,setCurrentPage,currentPage}) => {
  return (
    <Flex
            mb={6}
            justifyContent="space-between"
            flexDirection={{
              base: "column",
              sm: "row",
            }}
          >
            <Flex>{land?.length} transactions found</Flex>
            <PRight
              lands={land}
              post={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </Flex>
  )
}

export default PaginationTop