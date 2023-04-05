const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User  Functionalities", function () {
  let landRegistry;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const LandRegistry = await ethers.getContractFactory("landregistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();

    // Set owner as the contract owner
    await landRegistry.changeContractOwner(owner.address);
  });

  // Define the test case for registerUser
  it("allows users to register themselves", async function () {
    // Define the parameters for the new user
    const name = ethers.utils.formatBytes32String("John Doe");
    const dob = ethers.utils.formatBytes32String("01-01-1970");
    const city = ethers.utils.formatBytes32String("New York");
    const district = ethers.utils.formatBytes32String("Manhattan");
    const cnic = 1234567890123;
    const document = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A2";
    const profilepic = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A3";
    const email = ethers.utils.formatBytes32String("johndoe@example.com");

    // Register a new user
       
    await landRegistry.connect(user).registerUser(
      name,
      dob,
      city,
      district,
      cnic,
      document,
      profilepic,
      email
    );

    // Verify that the user was registered successfully
    expect(await landRegistry.RegisteredUserMapping(user.address)).to.equal(
      true
    );
  });

    






});
