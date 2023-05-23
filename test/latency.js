// Import the necessary libraries and artifacts
const { expect } = require("chai");
const { ethers } = require("hardhat");
const name = ethers.utils.formatBytes32String("John Doe");
const dob = ethers.utils.formatBytes32String("01-01-1970");
const cnic = 1234567890123;
const city = ethers.utils.formatBytes32String("New York");
const district = ethers.utils.formatBytes32String("Manhattan");
const posdistrict = ethers.utils.formatBytes32String("Rawalpindi");
const phone = ethers.utils.formatBytes32String("03493664946");

const document = ethers.utils.formatBytes32String("Inspector");
const email = ethers.utils.formatBytes32String("johndoe@example.com");
const profilepic = ethers.utils.formatBytes32String("pic");
describe("LandRegistry", function () {
  it("should measure transaction latency", async function () {
    const LandRegistry = await ethers.getContractFactory("landregistry");

    const landRegistry = await LandRegistry.deploy();
    let account1 = await ethers.getSigner(1);
    let account2 = await ethers.getSigner(2);
    let account3 = await ethers.getSigner(3);


    // Measure transaction latency for registerLand function
    const startTimestamp = Math.floor(Date.now() / 1000);
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

      await landRegistry
      .connect(account2)
      .registerUser(
        name,
        dob,
        city,
        district,
        7130146091263,
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
        7130146091268,
        document,
        profilepic,
        email,
        phone
      );
    const endTimestamp = Math.floor(Date.now() / 1000);
    const latency = endTimestamp - startTimestamp;

    console.log(`{Start Time:${startTimestamp},endTime:${endTimestamp} Transaction Latency: ${latency}, seconds}`);
  });
});
