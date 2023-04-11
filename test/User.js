// const { expect } = require("chai");
// const { ethers } = require("hardhat");


// const uname = ethers.utils.formatBytes32String("John Doe");
// const udob = ethers.utils.formatBytes32String("01-01-1970");
// const ucity = ethers.utils.formatBytes32String("New York");
// const udistrict = ethers.utils.formatBytes32String("Manhattan");
// const ucnic = 1234567890123;
// const udocument = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A2";
// const uprofilepic = "QmXH4V4TrCD6yM7pUUGR6dA7pNTZjKuZmpdksph9XW15A3";
// const uemail = ethers.utils.formatBytes32String("johndoe@example.com");
// const uphone = ethers.utils.formatBytes32String("03493664946");


// const area = 1000;
// const landAddress = "123 Main St";
// const district = ethers.utils.formatBytes32String("Manhattan");
// const landPrice = 1000000;
// const allLatiLongi = "40.712776,-74.005974";
// const propertyPID = 123456789;
// const document = "document";
// const landpic = "landpic";


// describe("User  Functionalities", function () {
//   let landRegistry;
//   let owner;
//   let user;


//   beforeEach(async function () {
//     [owner, user] = await ethers.getSigners();

//     const LandRegistry = await ethers.getContractFactory("landregistry");
//     landRegistry = await LandRegistry.deploy();
//     await landRegistry.deployed();

//     // Set owner as the contract owner
//     await landRegistry.changeContractOwner(owner.address);
//   });

//   // Define the test case for registerUser


//   it("allows users to register themselves", async function () {
  
     
//     await landRegistry.connect(user).registerUser(
//       uname,
//       udob,
//       ucity,
//       udistrict,
//       ucnic,
//       udocument,
//       uprofilepic,
//       uemail,
//       uphone
//     );

//     // Verify that the user was registered successfully
//     expect(await landRegistry.RegisteredUserMapping(user.address)).to.equal(
//       true
//     );


//     })

// // Define the test case for registerUser
// it("does not allow users to register themselves multiple times", async function () {
//   await landRegistry.connect(user).registerUser(
//     uname,
//     udob,
//     ucity,
//     udistrict,
//     ucnic,
//     udocument,
//     uprofilepic,
//     uemail,
//     uphone
//   );

//   expect(await landRegistry.RegisteredUserMapping(user.address)).to.equal(true);

//   await expect(
//     landRegistry.connect(user).registerUser(
//       uname,
//       udob,
//       ucity,
//       udistrict,
//       ucnic,
//       udocument,
//       uprofilepic,
//       uemail,
//       uphone
//     )
//   ).to.be.revertedWith("Allreadey registerd");
// });




    






// }
// )