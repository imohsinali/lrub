// Import the necessary libraries and artifacts
const { expect } = require("chai");
const { ethers } = require("hardhat");

const name = ethers.utils.formatBytes32String("John Doe");
const dob = ethers.utils.formatBytes32String("01-01-1970");
const cnic = 1234567890123;
const city = ethers.utils.formatBytes32String("New York");
const district = ethers.utils.formatBytes32String("Manhattan");
const designation = ethers.utils.formatBytes32String("Inspector");
const email = ethers.utils.formatBytes32String("johndoe@example.com");
const phone = 1234567890;
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

const landPrice = 1000000;
const allLatiLongi = "40.712776,-74.005974";
const propertyPID = 123456789;
const propertyPID1 = 123456788;
const propertyPID2 = 1234567881;

const document = "document";
const landpic = "landpic";

let landId = 1;
let bidPrice = ethers.utils.parseEther("8");

describe("", function () {
  let contractOwner;
  let landRegistry;
  let account1;
  let account2;
  let account3;
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
    account3 = await ethers.getSigner(9);
    proxyOwner = await ethers.getSigner(8);

    await landRegistry.changeContractOwner(contractOwner.address);

    await landRegistry.addLandInspector(
      account1.address,
      name,
      dob,
      cnic,
      designation,
      city,
      district,
      email,
      phone
    );
    let cnic2 = 809809808080;
    await landRegistry.addLandInspector(
      account3.address,
      name,
      dob,
      cnic2,
      designation,
      city,
      ldistrict2,
      email,
      phone
    );

    await landRegistry
      .connect(user1)
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

    await landRegistry
      .connect(user3)
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
    await landRegistry
      .connect(user4)
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
    await landRegistry
      .connect(witness)
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
    await landRegistry.connect(account1).verifyUser(user1.address);
    await landRegistry.connect(account1).verifyUser(witness.address);
    await landRegistry.connect(account1).verifyUser(user3.address);

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

    await landRegistry.connect(account1).verifyLand(1);

    await landRegistry
      .connect(user1)
      .changeDetails(1, true, false, false, false, true, 0, "", "");
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
    await landRegistry.connect(user3).requestforBuyWithBid(landId, bidPrice);
  });

  describe("Land Inspector Functionalities", function () {
    it("checks if a given address belongs to a land inspector", async function () {
      expect(await landRegistry.isLandInspector(account1.address)).to.equal(
        true
      );
      expect(await landRegistry.isLandInspector(account2.address)).to.equal(
        false
      );
    });

    it("should return an array containing all land inspector addresses", async function () {
      const landInspectors = await landRegistry.ReturnAllLandIncpectorList();

      expect(landInspectors.length).to.equal(2);
      expect(landInspectors).to.include(account1.address);
      expect(landInspectors).to.not.include(user1.address);
    });

    it("allows land inspector to verify user", async function () {
      expect(await landRegistry.RegisteredUserMapping(user1.address)).to.equal(
        true
      );
      await landRegistry.connect(account1).verifyUser(user1.address);
      expect(await landRegistry.isUserVerified(user1.address)).to.equal(true);
    });

    it("allows land inspector to verify land", async function () {
      expect(await landRegistry.RegisteredUserMapping(user1.address)).to.equal(
        true
      );
      expect(await landRegistry.isLandInspector(account1.address)).to.equal(
        true
      );
      await landRegistry
        .connect(user1)
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID1,
          document,
          landpic
        );

      await landRegistry.connect(account1).verifyLand(2);
    });

    it("should not allow a land inspector to verify land outside their district", async function () {
      expect(await landRegistry.RegisteredUserMapping(user1.address)).to.equal(
        true
      );
      expect(await landRegistry.isLandInspector(account1.address)).to.equal(
        true
      );
      await landRegistry
        .connect(user1)
        .addLand(
          area,
          landAddress,
          ldistrict2,
          landPrice,
          allLatiLongi,
          propertyPID2,
          document,
          landpic
        );

      await expect(landRegistry.connect(account1).verifyLand(2)).to.be.reverted;

      // const land = await contract.lands(1);
      // expect(l).to.equal(true);
    });

    it("any other then land inspectot verify user and land", async function () {
      expect(await landRegistry.RegisteredUserMapping(user4.address)).to.equal(
        true
      );
      await expect(landRegistry.connect(user2).verifyUser(user4.address)).to.be
        .reverted;
      expect(await landRegistry.isUserVerified(user4.address)).to.equal(false);
    });

    it("should transfer ownership of a land", async function () {
      // Call the transferOwnership function with valid parameters

      const land = await landRegistry.lands(landId);
      expect(land.isforSell).to.be.true;

      const ownerAddress = land.ownerAddress;

      expect(ownerAddress).to.equal(user1.address);
      await landRegistry.connect(user1).acceptRequest(3, true);

      await landRegistry.connect(user3).makePayment(user1.address, 3, {
        from: user3.address,
        value: bidPrice,
      });
      await landRegistry
        .connect(account1)
        .transferOwnership(3, "https://example.com/document", witness.address);

      await expect(
        landRegistry
          .connect(account1)
          .transferOwnership(3, "https://example.com/document", user1.address)
      ).to.be.reverted;

      // Check that the transfer was successful by getting the land's owner address
      const Transfered_land = await landRegistry.lands(landId);
      const newownerAddress = Transfered_land.ownerAddress;
      expect(newownerAddress).to.equal(user3.address);
      expect(Transfered_land.isforSell).to.be.false;
      expect(newownerAddress).to.not.equal(user1.address);
    });

    it("should revert if the caller is not a land inspector or from other district", async function () {
      await landRegistry.connect(user1).acceptRequest(3, true);

      await landRegistry.connect(user3).makePayment(user1.address, 3, {
        from: user3.address,
        value: bidPrice,
      });

      await expect(
        landRegistry
          .connect(account2)
          .transferOwnership(3, "https://example.com/document", witness.address)
      ).to.be.reverted;

      await expect(
        landRegistry
          .connect(account3)
          .transferOwnership(3, "https://example.com/document", witness.address)
      ).to.be.reverted;
    });

    it("should revert if the payment is not done ", async function () {
      await landRegistry.connect(user1).acceptRequest(3, true);
      const request = await landRegistry.LandRequestMapping(3);
      expect(request.isPaymentDone).to.equal(false);

      await expect(
        landRegistry
          .connect(account1)
          .transferOwnership(3, "https://example.com/document", witness.address)
      ).to.be.reverted;
    });

    it("Should transfer ownership of a deceased owner's lands to their proxy owner", async function () {
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, false, 0, "", "");
      await landRegistry
        .connect(user1)
        .AndandRemoveProxyOwner(landId, proxyOwner.address, true);
      const land = await landRegistry.lands(landId);
      expect(land.proxyownerAddress).to.equal(proxyOwner.address);
      expect(land.ownerAddress).to.equal(user1.address);
      await landRegistry
        .connect(account1)
        .transferDeceasedOwnership(user1.address);
      const Tranferedland = await landRegistry.lands(landId);
      const newownerAddress = Tranferedland.ownerAddress;
      expect(newownerAddress).to.not.equal(user1.address);
      expect(newownerAddress).to.equal(proxyOwner.address);
    });

    it("should return an array of land request IDs sent by the caller", async function () {
      const landRequests = await landRegistry
        .connect(user3)
        .mySentLandRequests();

      expect(landRequests).to.be.an("array");
      expect(landRequests).to.have.lengthOf(3);
      expect(landRequests).to.not.have.lengthOf(2);
    });

    it("should return an array of land request IDs that have been received", async function () {
      // Create a new land request and add it to the MyReceivedLandRequest mapping
      const landRequests = await landRegistry
        .connect(user1)
        .myReceivedLandRequests();

      expect(landRequests).to.be.an("array");
      expect(landRequests).to.have.lengthOf(3);
      expect(landRequests).to.not.have.lengthOf(2);
    });

    it("should return an array containing all lands owned by a given address", async function () {
      // Add some land IDs to the MyLands mapping for user1

      const user1Lands = await landRegistry.myAllLands(user1.address);
      const user3Lands = await landRegistry.myAllLands(user3.address);

      expect(user1Lands.length).to.equal(1);
      expect(user3Lands.length).to.equal(0);

      const land = await landRegistry.lands(landId);
      expect(land.isforSell).to.be.true;

      await landRegistry.connect(user1).acceptRequest(3, true);

      await landRegistry.connect(user3).makePayment(user1.address, 3, {
        from: user3.address,
        value: bidPrice,
      });
      await landRegistry
        .connect(account1)
        .transferOwnership(3, "https://example.com/document", witness.address);

      const user1Lands1 = await landRegistry.myAllLands(user1.address);
      const user3Lands1 = await landRegistry.myAllLands(user3.address);

      expect(user1Lands1.length).to.equal(0);
      expect(user3Lands1.length).to.equal(1);
    });

    it("should return an array containing all land IDs", async function () {
      const allLandIDs = await landRegistry.ReturnAllLandList();

      expect(allLandIDs.length).to.equal(1);
    });

    it("should return an array containing the history of the given land ID", async function () {
      // Call the `getLandHistoryId` function on the smart contract with the land ID
      //   const landHistory = await mySmartContract.getLandHistoryId(123);
      //   expect(landHistory.length).to.equal(2);
      //   expect(landHistory[0].landId).to.equal(123);
      //   expect(landHistory[0].info).to.equal(update1);
      //   expect(landHistory[1].landId).to.equal(123);
      //   expect(landHistory[1].info).to.equal(update2);
    });

    it("should return true if the given property PID is already in use", async function () {
      // Add a new land with a property PID of 123 to the smart contract

      const isDuplicate = await landRegistry.CheckDuplicatePid(propertyPID);

      // Assert that the function returns true
      expect(isDuplicate).to.equal(true);
    });

    it("should allow subdividing land correctly", async function () {
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, false, 0, "", "");

      let land = await landRegistry.lands(landId);
      expect(land.area).to.be.equal(1000);
      await landRegistry.connect(user1).subplot(landId, 50, 5);

      land = await landRegistry.lands(landId);
      expect(land.area).to.be.equal(750);

      const user1Lands = await landRegistry.myAllLands(user1.address);
      expect(user1Lands.length).to.equal(6);
    });

    it("should return an array containing the history of the given land ID", async function () {
      await landRegistry
        .connect(user1)
        .changeDetails(1, true, false, false, false, false, 0, "", "");

      let land = await landRegistry.lands(landId);
      expect(land.area).to.be.equal(1000);
      await landRegistry.connect(user1).subplot(landId, 50, 5);

      land = await landRegistry.lands(landId);
      expect(land.area).to.be.equal(750);

      const user1Lands = await landRegistry.myAllLands(user1.address);
      expect(user1Lands.length).to.equal(6);

      //   const landHistory = await landRegistry.getLandHistory(1);

      await landRegistry.connect(user1).subplot(landId, 20, 5);
      //   const landHistory1 = await landRegistry.getLandHistory(1);
      //   const landinfo = await landRegistry.landinfo(1);
    });

  });
});
