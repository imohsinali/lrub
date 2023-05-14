import React from 'react'
import PRight from './Pagination';
import { Flex, Select, Text } from '@chakra-ui/react';

const PaginationButtom = ({land,postsPerPage,setPostPerPage,setCurrentPage,currentPage}) => {
  return (
    <Flex
              justifyContent="space-between"
              mt={4}
              flexDirection={{
                base: "column",
                sm: "row",
              }}
            >
              <Flex gap={1} alignItems="center">
                <Text>Show</Text>
                <Select
                  size="sm"
                  heigth={20}
                  defaultValue="10"
                  borderRadius={"5"}
                  onChange={(e) => {
                    setPostPerPage(parseInt(e.target.value));
                  }}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Select>
                <Text> Records</Text>
              </Flex>
              <PRight
                lands={land}
                post={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Flex>

  )
}

export default PaginationButtom