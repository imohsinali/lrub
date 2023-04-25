// Import the necessary libraries and artifacts
const { expect } = require("chai");
const { ethers } = require("hardhat");


const uname = ethers.utils.formatBytes32String("John Doe");
const udob = ethers.utils.formatBytes32String("01-01-1970");
const ucity = ethers.utils.formatBytes32String("New York");
const udistrict = ethers.utils.formatBytes32String("Manhattan");
const ucnic = 1234567890123;
const udocument = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A2";
const uprofilepic = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A3";
const uemail = ethers.utils.formatBytes32String("johndoe@example.com");
const uphone = ethers.utils.formatBytes32String("03493664946");
const area = 1000;
const landAddress = "123 Main St";
const ldistrict = ethers.utils.formatBytes32String("Manhattan");
const ldistrict2 = ethers.utils.formatBytes32String("Rawalpindi");

const landPrice = 1000;
const allLatiLongi = "40.712776,-74.005974";
const propertyPID = 123456789;
const propertyPID1 = 123456788;
const propertyPID2 = 1234567881;

const document = "document";
const landpic = "landpic";

let landId = 1;
let bidPrice = ethers.utils.parseEther("8");
const posdistrict = ethers.utils.formatBytes32String("Manhattan");
const posdistrict2 = ethers.utils.formatBytes32String("Rawalpindi");
describe("", function () {
  let contractOwner;
  let landRegistry;
  let account1;
  let account2;
  let user1;
  let user2;
  let user3;
  let user4;
  let witness;

  let proxyOwner;

  beforeEach(async function () {
    const LandRegistry = await ethers.getContractFactory("landregistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();

    contractOwner = await ethers.getSigner(0);
    account1 = await ethers.getSigner(1);
    account2 = await ethers.getSigner(2);
    user1 = await ethers.getSigner(3);
    user2 = await ethers.getSigner(4);
    user3 = await ethers.getSigner(5);
    user4 = await ethers.getSigner(6);
    witness = await ethers.getSigner(7);

    proxyOwner = await ethers.getSigner(8);

    await landRegistry.changeContractOwner(contractOwner.address);

    await landRegistry
      .connect(account1)
      .registerUser(
        uname,
        udob,
        ucity,
        udistrict,
        7130146091243,
        udocument,
        uprofilepic,
        uemail,
        uphone
      );
    await landRegistry.addLandInspector(account1.address, posdistrict);

    await landRegistry
      .connect(user1)
      .registerUser(
        uname,
        udob,
        ucity,
        udistrict,
        7130146091223,
        udocument,
        uprofilepic,
        uemail,
        uphone
      );

    await landRegistry
      .connect(user3)
      .registerUser(
        uname,
        udob,
        ucity,
        udistrict,
        7130146091221,
        udocument,
        uprofilepic,
        uemail,
        uphone
      );
    await landRegistry
      .connect(user4)
      .registerUser(
        uname,
        udob,
        ucity,
        udistrict,
        7130146091245,
        udocument,
        uprofilepic,
        uemail,
        uphone
      );
    await landRegistry
      .connect(witness)
      .registerUser(
        uname,
        udob,
        ucity,
        udistrict,
        7130146091227,
        udocument,
        uprofilepic,
        uemail,
        uphone
      );
    await landRegistry.connect(account1).verifyUserAccepted(user1.address);
    await landRegistry.connect(account1).verifyUserAccepted(witness.address);

    await landRegistry.connect(account1).verifyUserAccepted(user3.address);

    await landRegistry
      .connect(user1)
      .addLand(
        area,
        landAddress,
        ldistrict,
        landPrice,
        allLatiLongi,
        propertyPID,
        document,
        landpic
      );

    await landRegistry.connect(account1).verifyLandAccepted(1);

    await landRegistry
      .connect(user1)
      .changeDetails(1, true, false, false, false, true, 0, "", "");
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
  });

  describe("User Functionalities", function () {
    it("allows users to register themselves", async function () {
      // Verify that the user was registered successfully
      expect(await landRegistry.RegisteredUserMapping(user1.address)).to.equal(
        true
      );
    });

    // Define the test case for registerUser
    it("does not allow users to register themselves multiple times", async function () {
      await landRegistry
        .connect(user2)
        .registerUser(
          uname,
          udob,
          ucity,
          udistrict,
          ucnic,
          udocument,
          uprofilepic,
          uemail,
          uphone
        );

      expect(await landRegistry.RegisteredUserMapping(user2.address)).to.equal(
        true
      );

      await expect(
        landRegistry
          .connect(user2)
          .registerUser(
            uname,
            udob,
            ucity,
            udistrict,
            ucnic,
            udocument,
            uprofilepic,
            uemail,
            uphone
          )
      ).to.be.revertedWith("Allreadey registerd");
    });

    it("Check it the user is verified or not", async function () {
      expect(await landRegistry.isUserVerified(user1.address)).to.equal(true);
    });

    it("Add land if the user is verfied", async function () {
      await landRegistry
        .connect(user1)
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID2,
          document,
          landpic
        );
    });

    it("The pid should not be same", async function () {
      await landRegistry
        .connect(user1)
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID2,
          document,
          landpic
        );
      await expect(
        landRegistry
          .connect(user1)
          .addLand(
            area,
            landAddress,
            ldistrict,
            landPrice,
            allLatiLongi,
            propertyPID,
            document,
            landpic
          )
      ).to.be.reverted;
    });

    it("non verfied user cann't add land", async function () {
      await expect(
        landRegistry
          .connect(user4)
          .addLand(
            area,
            landAddress,
            ldistrict,
            landPrice,
            allLatiLongi,
            propertyPID,
            document,
            landpic
          )
      ).to.be.reverted;
    });

    it("should return all registered user addresses", async function () {
      const usersList = await landRegistry.ReturnAllUserList();
      expect(usersList).to.eql([
        account1.address,
        user1.address,
        user3.address,
        user4.address,
        witness.address,
      ]);
    });

    it("should check whether a given address is registered or not", async function () {
      const usersList = await landRegistry.ReturnAllUserList();
      expect(usersList).to.not.eql([
        user1.address,
        user2.address,
        user4.address,
        user3.address,
      ]);
    });

    it("should add a proxy owner when _addRemove is true", async function () {
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, false, 0, "", "");
      await expect(
        landRegistry
          .connect(user2)
          .AndandRemoveProxyOwner(landId, proxyOwner.address, false)
      ).to.be.reverted;
      await landRegistry
        .connect(user1)
        .AndandRemoveProxyOwner(landId, proxyOwner.address, true);

      const land = await landRegistry.lands(landId);
      expect(land.proxyownerAddress).to.equal(proxyOwner.address);
    });

    // Test removing a proxy owner
    it("should remove a proxy owner when _addRemove is false and proxy owner matches", async function () {
      // Add a proxy owner first
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, false, 0, "", "");
      await expect(
        landRegistry
          .connect(user2)
          .AndandRemoveProxyOwner(landId, proxyOwner.address, false)
      ).to.be.reverted;

      await landRegistry
        .connect(user1)
        .AndandRemoveProxyOwner(landId, proxyOwner.address, true);

      // expect(land.proxyownerAddress).to.equal(proxyOwner.address);

      await landRegistry
        .connect(user1)
        .AndandRemoveProxyOwner(landId, proxyOwner.address, false);
      const land = await landRegistry.lands(landId);

      expect(land.proxyownerAddress).to.equal(contractOwner.address);
    });

    // Test reverting when land is not owned by msg.sender or not verified or is for sell
    it("should revert when land is not owned by msg.sender or  is for sell", async function () {
      // Try to add a proxy owner when land is not owned by msg.sender

      await expect(
        landRegistry
          .connect(user2)
          .AndandRemoveProxyOwner(landId, proxyOwner.address, false)
      ).to.be.reverted;

      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, true, 0, "", "");

      // Try to add a proxy owner when land is not verified
      await expect(
        landRegistry
          .connect(user1)
          .AndandRemoveProxyOwner(landId, proxyOwner.address, true)
      );
    });

    it("should change land details when all conditions are met", async function () {
      const newPrice = ethers.utils.parseEther("1");
      const newPic = "newPicUrl";
      const allLatiLongi = "newLatiLongi";
      const allLatiLongi2 = "newLatiLong1";

      await landRegistry
        .connect(user1)
        .changeDetails(
          1,
          true,
          true,
          true,
          true,
          false,
          newPrice,
          newPic,
          allLatiLongi
        );

      const land = await landRegistry.lands(landId);
      expect(land.isforSell).to.be.false;
      expect(land.landPrice).to.equal(newPrice);
      expect(land.landpic).to.equal(newPic);
      expect(land.allLatitudeLongitude).to.equal(allLatiLongi);
      expect(land.allLatitudeLongitude).to.not.equal(allLatiLongi2);
    });

    it("should create a new buy request with bid price", async function () {
      const landId = 1;
      const landPrice = ethers.utils.parseEther("1");

      await landRegistry.connect(account1).verifyUserAccepted(user3.address);

      bidPrice = ethers.utils.parseEther("5");
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, true, true, true, true, landPrice, "", "");
      // User 1 requests to buy land with bid price
      await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);

      // Check that a new land request is created with correct properties
      const requestCount = await landRegistry.requestCount();
      console.log(requestCount);
      const landRequest = await landRegistry.LandRequestMapping(requestCount);

      expect(landRequest.reqId).to.equal(requestCount);
      expect(landRequest.buyerId).to.equal(user3.address);
      expect(landRequest.sellerId).to.equal(user1.address);
      expect(landRequest.landId).to.equal(landId);
      expect(landRequest.requestStatus).to.equal(0);
      expect(landRequest.bidPrice).to.equal(bidPrice);
      expect(landRequest.isPaymentDone).to.be.false;

      // Check that user1's sent requests and owner's received requests are updated
      // const user1SentRequests = await landRegistry
      //   .connect(user3)
      //   .mySentLandRequests();
      // const ownerReceivedRequests = await landRegistry
      //   .connect(user1)
      //   .myReceivedLandRequests();

      // expect(user1SentRequests).to.eql([requestCount]);
      // expect(ownerReceivedRequests).to.eql([requestCount]);
    });

    it("should update land price and reject all other requests for the same land when accepting a request with bid price", async function () {
      await landRegistry.connect(user1).acceptRequest(3);

      let landRequest3 = await landRegistry.LandRequestMapping(3);
      let landRequest2 = await landRegistry.LandRequestMapping(2);
      expect(landRequest3.sellerId).to.equal(user1.address);

      expect(landRequest3.requestStatus).to.equal(2);
      expect(landRequest2.requestStatus).to.equal(1);
    });

    it("should make a payment for an accepted request", async function () {
      // Accept the land request

      await landRegistry.connect(user1).acceptRequest(3);

      await landRegistry.connect(user3).makePayment(user1.address, 3, {
        from: user3.address,
        value: bidPrice,
      });

      const price = await landRegistry.landPriceInfo(3);
      console.log(price);
      const request = await landRegistry.LandRequestMapping(3);
      expect(request.isPaymentDone).to.equal(true);
    });

    it("should revert if request is not accepted", async function () {
      // Try to make a payment for a request that has not been accepted

      await landRegistry.connect(user1).rejectRequest(3);

      await expect(
        landRegistry.connect(user3).makePayment(user1.address, 3, {
          from: user3.address,
          value: bidPrice,
        })
      ).to.be.reverted;
    });

    it("should revert if wrong receiver is provided", async function () {
      // Accept the land request

      await landRegistry.connect(user1).acceptRequest(3);

      await expect(
        landRegistry.connect(user3).makePayment(user4.address, 3, {
          from: user3.address,
          value: bidPrice,
        })
      ).to.be.reverted;
    });

    it("should revert if incorrect payment amount is sent", async function () {
      // Accept the land request
      bidPrice = ethers.utils.parseEther("7.9999");

      await landRegistry.connect(user1).acceptRequest(3);

      await expect(
        landRegistry.connect(user3).makePayment(user1.address, 3, {
          from: user3.address,
          value: bidPrice,
        })
      ).to.be.reverted;
    });
  });
});
