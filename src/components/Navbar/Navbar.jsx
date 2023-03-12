import { Flex} from '@chakra-ui/react'
import Image from 'next/image';
import React from 'react'
import RightContent from './RightContent/RightContent'
// import SearchInput from './SearchInput'


export default function Navbar() {

  return (
    <Flex bg={"white"} height={"80px"} padding="6px 12px" alignItems={'center'} justifyContent="space-between">
      <Flex align={"center"}>
        <Image src="/images/nlogo.jpg"  width={70} height={100} />
      </Flex>
      {/* <SearchInput/> */}
      <RightContent  />
    </Flex>
  );
}