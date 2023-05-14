import { ethers } from "ethers";
export const getAlluser = async (contract) => {
  const userAddresses = await contract?.ReturnAllUserList();
  if (userAddresses) {
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
          cnic,
          email,
          phone,
          district,
        } = await contract.UserMapping(address);
        return {
          address,
          name: ethers.utils.parseBytes32String(name),
          city: ethers.utils.parseBytes32String(city),
          district: ethers.utils.parseBytes32String(district),
          email: ethers.utils.parseBytes32String(email),
          phone: ethers.utils.parseBytes32String(phone),
          dob: ethers.utils.parseBytes32String(dob),
          cnic: parseInt(cnic?._hex),
          registerdate: parseInt(registerdate?._hex),
          isUserVerified,
          document,
          profilepic,
        };
      })
    );

  const userInfo = await Promise?.all(
    userAddresses?.map(async (address) => {
      const { verfiedby, verifydate, verfiactionStatus } =
        await contract?.userinfo(address);
      return {
        verifydate: parseInt(verifydate?._hex),
        verfiedby,
        verStatus: verfiactionStatus,
      };
    })
  );

  // Combine user information and user verification information
  const usersWithInfo = users.map((user, index) => {
    return {
      ...user,
      ...userInfo[index],
    };
  });
  console.log("suer", usersWithInfo);
  return usersWithInfo;
}
};

export const Lands = async (contract) => {
  const allLandhex = await contract?.landsCount();
  const totalLands = parseInt(allLandhex?._hex);
  const landsArray = [];
  for (let i = 0; i < totalLands; i++) {
    landsArray.push(i + 1);
  }

  console.log("ashdo", totalLands);

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
        landPrice: parseInt(landPrice?._hex) / 10 ** 18,
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

  console.log("las;als", land);
  const landinfo = await Promise?.all(
    landsArray?.map(async (id) => {
      const { verfydate, verfiedby, childs, verfiactionStatus } =
        await contract?.landinfo(id);
      return {
        timestamp: parseInt(verfydate?._hex),
        childs: parseInt(childs._hex),
        verfiedby,
        verStatus: verfiactionStatus,
      };
    })
  );

  const landPriceInfo = await Promise?.all(
    landsArray?.map(async (id) => {
      const { basePrice } = await contract?.landPriceInfo(id);
      return {
        basePrice: parseInt(basePrice?._hex),
      };
    })
  );

  const requeststatus = {
    0: "pending",
    1: "accepted",
    2: "rejected",
    3: "paymentdone",
    4: "completed",
  };
  const getStatus = async (landId) => {
    const status = await contract?.LandRequestMapping(landId);
    return requeststatus[status?.requestStatus];
  };

  const landsData = await Promise.all(
    land.map(async (landItem, index) => {
      const status = await getStatus(landItem.id);
      return {
        ...landItem,
        ...landinfo[index],
        ...landPriceInfo[index],
        landStatus: status,
      };
    })
  );

  console.log("fun", landsData);

  return landsData;
};

export const RecivedRequest = async (contract) => {
  const allLand = await contract.myReceivedLandRequests();
  const request = await Promise.all(
    allLand.map(async (id) => {
      const {
        sellerId,
        buyerId,
        landId,
        reqId,
        bidPrice,
        requestStatus,
        isPaymentDone,
      } = await contract.LandRequestMapping(id);
      return {
        sellerId,
        buyerId,
        landId: parseInt(landId._hex),
        reqId: parseInt(reqId._hex),
        requestStatus,
        bidPrice: parseInt(bidPrice._hex) / 10 ** 18,
        isPaymentDone,
      };
    })
  );

  const landPriceInfo = await Promise?.all(
    allLand?.map(async (id) => {
      const { basePrice } = await contract?.landPriceInfo(id);
      return {
        basePrice: parseInt(basePrice?._hex),
      };
    })
  );

  const usersWithStatus = await Promise.all(
    request.map(async (req, index) => {
      return {
        ...landPriceInfo[index],

        ...req,
      };
    })
  );
  return usersWithStatus;
};

export const SendRequest = async (contract) => {
  const allLand = await contract.mySentLandRequests();
  const request = await Promise.all(
    allLand.map(async (id) => {
      const {
        sellerId,
        buyerId,
        landId,
        reqId,
        bidPrice,
        requestStatus,
        isPaymentDone,
      } = await contract.LandRequestMapping(id);
      return {
        sellerId,
        buyerId,
        landId: parseInt(landId._hex),
        reqId: parseInt(reqId._hex),
        requestStatus,
        bidPrice: parseInt(bidPrice._hex) / 10 ** 18,
        isPaymentDone,
      };
    })
  );

  const usersWithStatus = await Promise.all(
    request.map(async (req) => {
      return {
        ...req,
      };
    })
  );
  console.log("asaks", usersWithStatus);

  return usersWithStatus;
};

export const landRequest = async (contract) => {
  const allLandhex = await contract?.landsCount();
  const totalLands = parseInt(allLandhex?._hex);
  const landsArray = [];
  for (let i = 0; i < totalLands; i++) {
    landsArray.push(i + 1);
  }
  const request = await Promise.all(
    [1, 2, 3, 4, 5].map(async (id) => {
      const {
        sellerId,
        buyerId,
        landId,
        reqId,
        bidPrice,
        requestStatus,
        isPaymentDone,
      } = await contract.LandRequestMapping(id);
      return {
        sellerId,
        buyerId,
        landId: parseInt(landId._hex),
        reqId: parseInt(reqId._hex),
        requestStatus,
        bidPrice: parseInt(bidPrice._hex) / 10 ** 18,
        isPaymentDone,
      };
    })
  );

  console.log("land", request);

  return request;
};
