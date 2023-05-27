const { ethers } = require("hardhat");
const name = ethers.utils.formatBytes32String("John Doe");
const dob = ethers.utils.formatBytes32String("01-01-1970");
const city = ethers.utils.formatBytes32String("Rawalpindi");
const district = ethers.utils.formatBytes32String("Rawalpindi");
const posdistrict = ethers.utils.formatBytes32String("Rawalpindi");
const phone = ethers.utils.formatBytes32String("03493664946");

const document = ethers.utils.formatBytes32String("Inspector");
const email = ethers.utils.formatBytes32String("johndoe@example.com");
const profilepic = ethers.utils.formatBytes32String("pic");
const area = 1000;
const landAddress = "123 Main St";
const ldistrict = ethers.utils.formatBytes32String("Rawalpindi");
const ldistrict2 = ethers.utils.formatBytes32String("Rawalpindi");

const landPrice = 1000;
const allLatiLongi = "40.712776,-74.005974";
const propertyPID = 123456789;
const propertyPID1 = 123456788;
const propertyPID2 = 1234567881;

const landpic = "landpic";

let landId = 1;
let bidPrice = ethers.utils.parseEther("8");

describe("", function () {
  let landRegistry;
  let contractOwner;
  let account1;
  let account3;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("landregistry");
    landRegistry = await Contract.deploy();
    await landRegistry.deployed();

    // Set the contract owner to an address for testing purposes
    contractOwner = await ethers.getSigner(0);
    account1 = await ethers.getSigner(1);
    let account2 = await ethers.getSigner(2);
    account3 = await ethers.getSigner(3);

    await landRegistry
      .connect(account2)
      .registerUser(
        name,
        dob,
        city,
        district,
        7130146091268,
        document,
        profilepic,
        email,
        phone
      );
    await landRegistry
      .connect(account3)
      .registerUser(
        name,
        dob,
        city,
        district,
        7130146091269,
        document,
        profilepic,
        email,
        phone
      );
  });

  it("", async function () {
    let account4 = await ethers.getSigner(4);

    await landRegistry
      .connect(account4)
      .registerUser(
        name,
        dob,
        city,
        district,
        7130146091260,
        document,
        profilepic,
        email,
        phone
      );
    let startTime = Date.now();
    await landRegistry.changeContractOwner(contractOwner.address);

    let endTime = Date.now();
    let latency = endTime - startTime;

    console.log("Latency of changeContractOwner: ", latency, "ms");

    startTime = Date.now();
    result = await landRegistry.isContractOwner(contractOwner.address);
    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of isContractOwner", latency, "ms");

    startTime = Date.now();
    await landRegistry
      .connect(account1)
      .registerUser(
        name,
        dob,
        city,
        district,
        7130146091265,
        document,
        profilepic,
        email,
        phone
      );
    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of register user", latency, "ms");

    startTime = Date.now();
    await landRegistry.addLandInspector(account1.address, posdistrict);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of addLandInspector", latency, "ms");

    startTime = Date.now();
    await landRegistry.removeLandInspector(account1.address);
    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of Remove LandInspector", latency, "ms");

    startTime = Date.now();
    await landRegistry.RegisteredInspectorMapping(account1.address);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of RegisteredInspectorMapping", latency, "ms");

    await landRegistry.addLandInspector(account1.address, posdistrict);

    startTime = Date.now();
    await landRegistry.connect(account1).verifyUserAccepted(account4.address);
    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of verifyUserAccepted", latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account1).verifyUserAccepted(account3.address);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of verifyUserRejected", latency, "ms");

    await landRegistry
      .connect(account3)
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
    startTime = Date.now();

    await landRegistry
      .connect(account3)
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

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of addLand", latency, "ms");

    startTime = Date.now();
    let land = await landRegistry.ReturnAllLandList();

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of ReturnAllLandList ", land, latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account1).verifyLandAccepted(1);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of verifyLandAccepted ", latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account1).verifyLandRejected(2);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of verifyLandRejected ", latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account3).subplot(1, 100, 4);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of subplot ", latency, "ms");

    startTime = Date.now();
    await landRegistry
      .connect(account3)
      .AndandRemoveProxyOwner(1, account4.address, true);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of AndandRemoveProxyOwner ", latency, "ms");

    startTime = Date.now();
    await landRegistry
      .connect(account3)
      .changeDetails(1, true, true, true, true, true, landPrice, "", "");

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of changeDetails ", latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account4).requestforBuyWithBid(1, 400);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of requestforBuyWithBid ", latency, "ms");

    startTime = Date.now();
    let req = await landRegistry.connect(account3).myReceivedLandRequests();

    endTime = Date.now();
    latency = endTime - startTime;
    console.log(
      "Latency of myReceivedLandRequests account3 ",
      req,
      latency,
      "ms"
    );

    startTime = Date.now();
    req = await landRegistry.connect(account4.address).mySentLandRequests();

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of mySentLandRequests account4 ", req, latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account3).acceptRequest(1);

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of acceptRequest ", latency, "ms");

    startTime = Date.now();
    await landRegistry.connect(account4).makePayment(account3.address, 1, {
      from: account4.address,
      value: 400,
    });

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of makePayment ", latency, "ms");

    startTime = Date.now();
    await landRegistry.ReturnAllLandList();

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of ReturnAllLandList ", latency, "ms");

    startTime = Date.now();
    await landRegistry.ReturnAllLandList();

    endTime = Date.now();
    latency = endTime - startTime;
    console.log("Latency of ReturnAllLandList ", latency, "ms");
  });
});
