// Import the necessary libraries and artifacts
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define the test suite
describe("Admin Functionalities", function () {
  let contractOwner;
  let landRegistry;
  let account1;
  let account2;

  // Before each test, deploy a new instance of the contract and set the contract owner
  beforeEach(async function () {
    const LandRegistry = await ethers.getContractFactory("landregistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();

    contractOwner = await ethers.getSigner(0);
    account1 = await ethers.getSigner(1);
    account2 = await ethers.getSigner(2);

    await landRegistry.changeContractOwner(contractOwner.address);
  });

  // Define the test case for isContractOwner
  it("returns true if the address is the contract owner", async function () {
    expect(await landRegistry.isContractOwner(contractOwner.address)).to.equal(
      true
    );
  });

  it("returns false if the address is not the contract owner", async function () {
    expect(await landRegistry.isContractOwner(account1.address)).to.equal(
      false
    );
  });

  // Define the test case for changeContractOwner
  it("allows the contract owner to be changed", async function () {
    // Verify that the current contract owner is the original signer
    expect(await landRegistry.isContractOwner(contractOwner.address)).to.equal(
      true
    );

    // Change the contract owner
    await landRegistry.changeContractOwner(account1.address);

    // Verify that the new contract owner is now the specified account
    expect(await landRegistry.isContractOwner(account1.address)).to.equal(true);
  });

  it("does not allow non-contract owners to change the contract owner", async function () {
    // Define a non-contract owner
    const nonOwner = await ethers.getSigner(1);

    // Try to change the contract owner as the non-contract owner
    expect(
      await landRegistry.connect(nonOwner).changeContractOwner(nonOwner.address)
    ).to.be.revertedWith("You are not the contract owner");

    // Verify that the contract owner did not change
    expect(await landRegistry.isContractOwner(nonOwner.address)).to.be.false;
  });

  // Define the test case for addLandInspector
  it("allows the contract owner to add a new land inspector", async function () {
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
    await landRegistry
      .connect(contractOwner)
      .addLandInspector(
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

    // Verify that the land inspector was added successfully
    expect(
      await landRegistry.RegisteredInspectorMapping(account1.address)
    ).to.equal(true);
  });

  // Define the test case for non-contract owners trying to add a new land inspector
  it("does not allow non-contract owners to add a new land inspector", async function () {
    // Define the parameters for the new land inspector
    const name = ethers.utils.formatBytes32String("John Doe");
    const dob = ethers.utils.formatBytes32String("01-01-1970");
    const cnic = 1234567890123;
    const city = ethers.utils.formatBytes32String("New York");
    const district = ethers.utils.formatBytes32String("Manhattan");
    const designation = ethers.utils.formatBytes32String("Inspector");
    const email = ethers.utils.formatBytes32String("johndoe@example.com");
    const phone = 1234567890;

    // Try to add a new land inspector as a non-contract owner
    await expect(
      landRegistry
        .connect(account1)
        .addLandInspector(
          account2.address,
          name,
          dob,
          cnic,
          designation,
          city,
          district,
          email,
          phone
        )
    );

    // Verify that the land inspector was not added
    expect(
      await landRegistry.RegisteredInspectorMapping(account2.address)
    ).to.equal(false);
  });
  it("allows the contract owner to remove a land inspector", async function () {
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

    // Verify that the land inspector was added successfully
    expect(
      await landRegistry.RegisteredInspectorMapping(account1.address)
    ).to.equal(true);

    // Remove the land inspector
    await landRegistry.removeLandInspector(account1.address);

    // Verify that the land inspector was removed successfully
    expect(
      await landRegistry.RegisteredInspectorMapping(account1.address)
    ).to.equal(false);
  });

  // Define the test case for removeLandInspector
  it("does not allow non-admin accounts to remove a land inspector", async function () {
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

    expect(
      await landRegistry.RegisteredInspectorMapping(account1.address)
    ).to.equal(true);

    // Attempt to remove the land inspector using a non-admin account
    await expect(
      landRegistry.connect(account2).removeLandInspector(account1.address)
    );
    expect(
      await landRegistry.RegisteredInspectorMapping(account1.address)
    ).to.equal(true);

    // Verify that the land inspector still exists
  });
});
