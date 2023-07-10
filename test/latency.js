// Import the necessary libraries and artifacts
const { expect } = require("chai");
const { ethers } = require("hardhat");

const uname = ethers.utils.formatBytes32String("John Doe");
const udob = ethers.utils.formatBytes32String("01-01-1970");
const ucity = ethers.utils.formatBytes32String("Islamabad");
const udistrict = ethers.utils.formatBytes32String("Islamabad");
const posdistrict = ethers.utils.formatBytes32String("Islamabad");
const ucnic = 1234567890123;
const udocument = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A2";
const uprofilepic = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A3";
const uemail = ethers.utils.formatBytes32String("johndoe@example.com");
const uphone = ethers.utils.formatBytes32String("03493664946");
const landAddress = "123 Main St";
const ldistrict = ethers.utils.formatBytes32String("Islamabad");
const area = 1000;

const landPrice = 1000;
const allLatiLongi = "40.712776,-74.005974";
const propertyPID = 123456789;
const propertyPID1 = 123456788;
const propertyPID2 = 1234567881;

const document = "document";
const landpic = "landpic";

let landId = 1;
let bidPrice = ethers.utils.parseEther("8");

describe("", function () {
  let landRegistry;

  const signers = [];

  beforeEach(async function () {
    const LandRegistry = await ethers.getContractFactory("landregistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();
    for (let i = 0; i <= 19; i++) {
      signers[i] = await ethers.getSigner(i);
    }
  });
  describe("User Functionalities", function () {
    it("user registration", async function () {
      const registrationPromises = [];

      // Measure the latency for 1 user registration
      const start1stUser = Date.now();
      await landRegistry
        .connect(signers[0])
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
      const end1stUser = Date.now();
      const latency1stUser = end1stUser - start1stUser;
      console.log(
        "Latency for the 1st user registration:",
        latency1stUser,
        "ms"
      );

      // Register 5 users
      for (let i = 1; i <= 5; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);

      // Measure the latency for the 6th user registration
      const start6thUser = Date.now();
      await landRegistry
        .connect(signers[6])
        .registerUser(
          uname,
          udob,
          ucity,
          udistrict,
          ucnic + 6,
          udocument,
          uprofilepic,
          uemail,
          uphone
        );
      const end6thUser = Date.now();
      const latency6thUser = end6thUser - start6thUser;
      console.log(
        "Latency for the 6th user registration:",
        latency6thUser,
        "ms"
      );

      // Clear the registration promises array
      registrationPromises.length = 0;

      // Register 10 more users
      for (let i = 7; i <= 10; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);

      // Measure the latency for the 17th user registration
      const start11thUser = Date.now();
      await landRegistry
        .connect(signers[11])
        .registerUser(
          uname,
          udob,
          ucity,
          udistrict,
          ucnic + 11,
          udocument,
          uprofilepic,
          uemail,
          uphone
        );
      const end11thUser = Date.now();
      const latency11thUser = end11thUser - start11thUser;
      console.log(
        "Latency for the 11th user registration:",
        latency11thUser,
        "ms"
      );

      // Clear the registration promises array
      registrationPromises.length = 0;

      // Register 15 more users
      for (let i = 12; i <= 15; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);

      const start16thUser = Date.now();
      await landRegistry
        .connect(signers[16])
        .registerUser(
          uname,
          udob,
          ucity,
          udistrict,
          ucnic + 16,
          udocument,
          uprofilepic,
          uemail,
          uphone
        );
      const end16thUser = Date.now();
      const latency16thUser = end16thUser - start16thUser;
      console.log(
        "Latency for the 16th user registration:",
        latency16thUser,
        "ms"
      );

      registrationPromises.length = 0;

      // Register 15 more users
      for (let i = 17; i < 19; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);

      const start19thUser = Date.now();
      await landRegistry
        .connect(signers[19])
        .registerUser(
          uname,
          udob,
          ucity,
          udistrict,
          ucnic + 19,
          udocument,
          uprofilepic,
          uemail,
          uphone
        );
      const end19thUser = Date.now();
      const latency19thUser = end19thUser - start19thUser;
      console.log(
        "Latency for the 19th user registration:",
        latency19thUser,
        "ms"
      );
    });

    it("user verification", async function () {
      await landRegistry.changeContractOwner(signers[0].address);
      const registrationPromises = [];

      for (let i = 1; i < 20; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);
      await landRegistry.addLandInspector(signers[1].address, posdistrict);

      const verificationPromises = [];

      // Measure the latency for 1 user verification
      const start1stUser = Date.now();
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[2].address);
      const end1stUser = Date.now();
      const latency1stUser = end1stUser - start1stUser;
      console.log("Latency for verifying 1st user:", latency1stUser, "ms");

      // Verify 5 users
      for (let i = 3; i <= 5; i++) {
        verificationPromises.push(
          landRegistry
            .connect(signers[1])
            .verifyUserAccepted(signers[i].address)
        );
      }
      await Promise.all(verificationPromises);

      // Measure the latency for the 6th user verification
      const start6thUser = Date.now();
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[6].address);
      const end6thUser = Date.now();
      const latency6thUser = end6thUser - start6thUser;
      console.log("Latency for verifying 6th user:", latency6thUser, "ms");

      // Clear the verification promises array
      verificationPromises.length = 0;

      // Verify 10 more users
      for (let i = 7; i <= 10; i++) {
        verificationPromises.push(
          landRegistry
            .connect(signers[1])
            .verifyUserAccepted(signers[i].address)
        );
      }
      await Promise.all(verificationPromises);

      const start11thUser = Date.now();
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[11].address);
      const end11thUser = Date.now();
      const latency11thUser = end11thUser - start11thUser;
      console.log("Latency for verifying 11th user:", latency11thUser, "ms");

      // Clear the verification promises array
      verificationPromises.length = 0;

      // Verify 15 more users
      for (let i = 12; i <= 15; i++) {
        verificationPromises.push(
          landRegistry
            .connect(signers[1])
            .verifyUserAccepted(signers[i].address)
        );
      }
      await Promise.all(verificationPromises);

      // Measure the latency for the 33rd user verification
      const start16thUser = Date.now();
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[16].address);
      const end16thUser = Date.now();
      const latency16thUser = end16thUser - start16thUser;
      console.log("Latency for verifying 16th user:", latency16thUser, "ms");

      verificationPromises.length = 0;

      // Verify 15 more users
      for (let i = 16; i <= 18; i++) {
        verificationPromises.push(
          landRegistry
            .connect(signers[1])
            .verifyUserAccepted(signers[i].address)
        );
      }
      await Promise.all(verificationPromises);

      // Measure the latency for the 33rd user verification
      const start20thUser = Date.now();
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[19].address);
      const end20thUser = Date.now();
      const latency20thUser = end20thUser - start20thUser;
      console.log("Latency for verifying 20th user:", latency20thUser, "ms");
    });

    it("add land", async function () {
      await landRegistry.changeContractOwner(signers[0].address);

      const registrationPromises = [];

      for (let i = 1; i < 20; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);
      await landRegistry.addLandInspector(signers[1].address, posdistrict);
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[2].address);
      const addLandPromises = [];

      // Measure the latency for the 1st land record
      const start1stLand = Date.now();
      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1000,
          document,
          landpic
        );
      const end1stLand = Date.now();
      const latency1stLand = end1stLand - start1stLand;
      console.log("Latency for adding 1st land record:", latency1stLand, "ms");

      // Add 10 more land records
      for (let i = 1; i <= 10; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);

      // Measure the latency for adding the 11th land record
      const start11thLand = Date.now();
      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1001,
          document,
          landpic
        );
      const end11thLand = Date.now();
      const latency11thLand = end11thLand - start11thLand;
      console.log(
        "Latency for adding 11th land record:",
        latency11thLand,
        "ms"
      );

      // Clear the addLand promises array
      addLandPromises.length = 0;

      // Add 50 more land records
      for (let i = 12; i <= 30; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);

      // Measure the latency for adding the 51st land record
      const start51stLand = Date.now();
      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1002,
          document,
          landpic
        );
      const end51stLand = Date.now();
      const latency51stLand = end51stLand - start51stLand;
      console.log(
        "Latency for adding 31st land record:",
        latency51stLand,
        "ms"
      );

      // Clear the addLand promises array
      addLandPromises.length = 0;

      // Add 100 more land records
      for (let i = 32; i <= 62; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);

      // Measure the latency for adding the 101st land record
      const start101stLand = Date.now();
      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1003,
          document,
          landpic
        );
      const end101stLand = Date.now();
      const latency101stLand = end101stLand - start101stLand;
      console.log(
        "Latency for adding 61st land record:",
        latency101stLand,
        "ms"
      );

      addLandPromises.length = 0;

      // Add 100 more land records
      for (let i = 63; i <= 99; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);

      // Measure the latency for adding the 101st land record
      const start63stLand = Date.now();
      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1005,
          document,
          landpic
        );
      const end100stLand = Date.now();
      const latency10stLand = end100stLand - start63stLand;
      console.log(
        "Latency for adding 100th land record:",
        latency10stLand,
        "ms"
      );
      

    });

    it("verify Land", async function () {
      await landRegistry.changeContractOwner(signers[0].address);

      const registrationPromises = [];

      for (let i = 1; i < 20; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);
      await landRegistry.addLandInspector(signers[1].address, posdistrict);
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[2].address);
      const addLandPromises = [];

      await landRegistry
        .connect(signers[2])
        .addLand(
          area,
          landAddress,
          ldistrict,
          landPrice,
          allLatiLongi,
          propertyPID + 1000,
          document,
          landpic
        );

      // Add 10 more land records
      for (let i = 1; i <= 100; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);
      const landCounts = [1, 10, 30, 60, 99,200]; // Number of land records to verify

      for (let i = 0; i < landCounts.length; i++) {
        const count = landCounts[i];

        // Verify the specified number of land records
        for (let j = 1; j <= count; j++) {
          await landRegistry.connect(signers[1]).verifyLandAccepted(j);
        }

        // Measure the latency for verifying the specified number of land records
        const startVerify = Date.now();
        await landRegistry.connect(signers[1]).verifyLandAccepted(count + 1);
        const endVerify = Date.now();
        const latencyVerify = endVerify - startVerify;
        console.log(
          `Latency for verifying ${
            count + 1
          }th land record after ${count} land records: ${latencyVerify} ms`
        );
      }
    });

    it("subploting", async function () {
      await landRegistry.changeContractOwner(signers[0].address);

      const registrationPromises = [];
      const addLandPromises = [];


      for (let i = 1; i < 20; i++) {
        registrationPromises.push(
          landRegistry
            .connect(signers[i])
            .registerUser(
              uname,
              udob,
              ucity,
              udistrict,
              ucnic + i,
              udocument,
              uprofilepic,
              uemail,
              uphone
            )
        );
      }
      await Promise.all(registrationPromises);
      await landRegistry.addLandInspector(signers[1].address, posdistrict);
      await landRegistry
        .connect(signers[1])
        .verifyUserAccepted(signers[2].address);

      await landRegistry
        .connect(signers[2])
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
       
  

      await landRegistry.connect(signers[1]).verifyLandAccepted(1);

      const startsubplot1 = Date.now();
      await landRegistry.connect(signers[2]).subplot(1, 10, 1);
      const endsubplot1 = Date.now();
      const latencysubplot1 = endsubplot1 - startsubplot1;
      console.log(
        "Latency for 1 subplotig register land is 1  land records ",
        latencysubplot1,
        "ms"
      );
      for (let i = 2; i <= 100; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);
      await landRegistry.connect(signers[1]).verifyLandAccepted(1);

      const startsubplot2 = Date.now();
      await landRegistry.connect(signers[2]).subplot(1, 10, 1);
      const endsubplot2 = Date.now();
      const latencysubplot2 = endsubplot2 - startsubplot2;
      console.log(
        "Latency for 1 subplotig register land is 100  land records ",
        latencysubplot2,
        "ms"
      );

      for (let i = 101; i <= 300; i++) {
        addLandPromises.push(
          landRegistry
            .connect(signers[2])
            .addLand(
              area,
              landAddress,
              ldistrict,
              landPrice,
              allLatiLongi,
              propertyPID + i,
              document,
              landpic
            )
        );
      }
      await Promise.all(addLandPromises);
      await landRegistry.connect(signers[1]).verifyLandAccepted(150);

      const startsubplot3 = Date.now();
      await landRegistry.connect(signers[2]).subplot(1, 10, 1);
      const endsubplot3 = Date.now();
      const latencysubplot3 = endsubplot3 - startsubplot3;
      console.log(
        "Latency for 1 subplotig register land is 200  land records ",
        latencysubplot3,
        "ms"
      );

    });
  });
});
