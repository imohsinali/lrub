import { ethers } from "ethers";

export const getAlluser = async (contract) => {
  const userAddresses = await contract?.ReturnAllUserList();
  const users = await Promise?.all(
    userAddresses?.map(async (address) => {
      const {
        name,
        city,
        dob,
        document,
        profilepic,
        isUserVerified,
        registerdate,
        cinc,
        email,
      } = await contract.UserMapping(address);
      return {
        address,
        name: ethers.utils.parseBytes32String(name),
        city: ethers.utils.parseBytes32String(city),
        email: ethers.utils.parseBytes32String(email),
        dob: ethers.utils.parseBytes32String(dob),
        cnic: parseInt(cinc?._hex),
        registerdate:parseInt(registerdate?._hex),
        isUserVerified,
        document,
        profilepic,
      };
    })
  );
  return users;
};



export const Lands = async (contract) => {
  const allLandhex = await contract?.landsCount();
  const totalLands = parseInt(allLandhex?._hex);
  const landsArray = [];
  for (let i = 0; i < totalLands; i++) {
    landsArray.push(i + 1);
  }

  const land = await Promise?.all(
    landsArray?.map(async (landid) => {
      const {
        id,
        area,
        landAddress,
        district,
        landPrice,
        allLatitudeLongitude,
        propertyPID,
        document,
        landpic,
        ownerAddress,
        proxyownerAddress,
        isforSell,
        isLandVerified,
        registerdate,
      } = await contract?.lands(landid);
      return {
        id: parseInt(id?._hex),

        landArea: parseInt(area?._hex),
        landPrice: parseInt(landPrice?._hex),
        propertyPID: parseInt(propertyPID?._hex),
        registerdate: parseInt(registerdate?._hex),
        landAddress: ethers.utils.parseBytes32String(landAddress),
        district: ethers.utils.parseBytes32String(district),
        document,
        landpic,
        allLatitudeLongitude,
        ownerAddress,
        proxyownerAddress,
        isforSell,
        isLandVerified,
      };
    })
  );

  console.log('las;als',land)
  const landinfo = await Promise?.all(
    landsArray?.map(async (id) => {
      const { timestamp, verfiedby } = await contract?.landinfo(id);
      return {
        timestamp: parseInt(timestamp?._hex),
        verfiedby,
      };
    })
  );

//   const landhistory = await Promise?.all(
//     landsArray?.map(async (id) => {
//       const { timestamp, parentId, childCount, ownerAddress } =
//         await contract?.getLandHistory(id);
//       return {
//         parentId: parseInt(parentId?._hex),
//         childCount: parseInt(childCount?._hex),
//         Harea: parseInt(area?._hex),
//         HownerAddress: ownerAddress,
//         Htimestampe: parseInt(timestamp._hex),
//       };
//     })
//   );

//   console.log(landhistory, "ajskj");

  const landsData = land.map((landItem, index) => ({
    ...landItem,
    ...landinfo[index],
    // ...landhistory[index],
  }));
  return landsData;
};