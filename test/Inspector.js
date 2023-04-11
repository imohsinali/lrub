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

const document = "document";
const landpic = "landpic";
describe("Testing LandRegsitry System", function () {
  let contractOwner;
  let landRegistry;
  let account1;
  let account2;
  let user1;
  let user2;
  let user3;

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

    await landRegistry.connect(account1).verifyUser(user1.address);
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
          propertyPID,
          document,
          landpic
        );

      await landRegistry.connect(account1).verifyLand(1);

    });


        it("should not allow a land inspector to verify land outside their district", async function () {
          expect(
            await landRegistry.RegisteredUserMapping(user1.address)
          ).to.equal(true);
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
              propertyPID,
              document,
              landpic
            );

          await expect(landRegistry.connect(account1).verifyLand(1)).to.be.reverted

          // const land = await contract.lands(1);
          // expect(l).to.equal(true);
        });

    it("any other then land inspectot verify user and land", async function () {
      expect(await landRegistry.RegisteredUserMapping(user3.address)).to.equal(
        true
      );
      await expect(landRegistry.connect(user2).verifyUser(user3.address)).to.be
        .reverted;
      expect(await landRegistry.isUserVerified(user3.address)).to.equal(false);
    });
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
          propertyPID,
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
          propertyPID,
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
          .connect(user3)
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
      expect(usersList).to.eql([user1.address, user3.address]);
    });

    it("this test should  failded as address 2 is not register", async function () {
      const usersList = await landRegistry.ReturnAllUserList();
    await expect(usersList).to.eql([user1.address, user2.address, user3.address]).to.be.reverted
    });

    // it("non verified user can't Add land", async function () {

    //  await expect(
    //    landRegistry
    //      .connect(user2)
    //      .addLand(
    //        area,
    //        landAddress,
    //        ldistrict,
    //        landPrice,
    //        allLatiLongi,
    //        propertyPID,
    //        document,
    //        landpic
    //      )
    //  ).to.be.revertedWith("User is not verified");

    // });
  });
});
