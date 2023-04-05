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
// Define the test suite
describe("Inspector Functionalities", function () {
  let contractOwner;
  let landRegistry;
  let account1;
  let account2;
  let user1;
  let user2;


  // Before each test, deploy a new instance of the contract and set the contract owner
  beforeEach(async function () {
    const LandRegistry = await ethers.getContractFactory("landregistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();

    contractOwner = await ethers.getSigner(0);
    account1 = await ethers.getSigner(1);
    account2 = await ethers.getSigner(2);
    user1 = await ethers.getSigner(3);
    user2 = await ethers.getSigner(4);


    await landRegistry.changeContractOwner(contractOwner.address);
  });

  // Define the test case for isLandInspector
  it("checks if a given address belongs to a land inspector", async function () {
    // Define the parameters for the new land inspector
    const name = ethers.utils.formatBytes32String("John Doe");
    const dob = ethers.utils.formatBytes32String("01-01-1970");
    const cnic = 1234567890123;
    const city = ethers.utils.formatBytes32String("New York");
    const district = ethers.utils.formatBytes32String("Manhattan");
    const designation = ethers.utils.formatBytes32String("Inspector");
    const email = ethers.utils.formatBytes32String("johndoe@example.com");
    const phone = 1234567890;

    // Add a new land inspector
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

    // Check if the added address is a land inspector
    expect(await landRegistry.isLandInspector(account1.address)).to.equal(true);

    // Check if a non-land inspector address is detected correctly
    expect(await landRegistry.isLandInspector(account2.address)).to.equal(
      false
    );
  });


  it("allows land inspector to verify user", async function () {

    

    // Add a new land inspector
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

    // Register a new user



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
        uemail
      );
expect(await landRegistry.RegisteredUserMapping(user1.address)).to.equal(true);
    // Verify the user by a land inspector
    await landRegistry.connect(account1).verifyUser(user1.address);

    // Verify that the user is now verified
    expect(
      await landRegistry.isUserVerified(user1.address)
    ).to.equal(true);
  });






});
