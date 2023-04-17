// SPDX-License-Identifier: MITs

pragma solidity ^0.8.0;

contract landregistry {
    address payable contractOwner;

    receive() external payable {}

    constructor() {
        contractOwner = payable(msg.sender);
    }

    struct LandInspector {
        uint id;
        address addr;
        bytes32 name;
        bytes32 dob;
        uint cnic;
        bytes32 city;
        bytes32 district;
        bytes32 designation;
        bytes32 email;
        uint phone;
    }

    struct User {
        address id;
        bytes32 name;
        bytes32 dob;
        bytes32 city;
        bytes32 district;
        uint cnic;
        string document;
        string profilepic;
        bytes32 email;
        bytes32 phone;
        bool isUserVerified;
        bool death;
        uint registerdate;
    }

    struct Land {
        uint id;
        uint propertyPID;
        uint area;
        uint landPrice;
        string landAddress;
        bytes32 district;
        string allLatitudeLongitude;
        string document;
        string landpic;
        bool isforSell;
        bool isLandVerified;
        address payable ownerAddress;
        address payable proxyownerAddress;
        uint registerdate;
    }
    struct LandInfo {
        address verfiedby;
        uint verfydate;
        bool directed;
        uint childs;
        verStatus verification;
    }

    struct LandPriceInfo {
        uint id;
        uint basePrice;
        uint landPrice;
    }
    struct UserInfo {
        address verfiedby;
        uint verifydate;
        verStatus verification;
    }
    struct TransferInfo {
        uint id;
        address seller;
        address buyer;
        address witness;
        address verfiedby;
        uint landid;
        uint transferdate;
    }

    struct LandHistory {
        uint parentId;
        uint childCount;
        uint childId;
        uint area;
        address parentAddress;
        uint parentIdRegisterdDate;
        uint childIdRegisterDate;
    }

    struct LandRequest {
        uint reqId;
        address payable sellerId;
        address payable buyerId;
        uint landId;
        reqStatus requestStatus;
        uint bidPrice;
        bool isPaymentDone;
    }

    enum reqStatus {
        requested,
        rejected,
        accepted,
        paymentdone,
        commpleted
    }

    enum verStatus {
        requested,
        rejected,
        accepted
    }

    uint public inspectorsCount;
    uint public userCount;
    uint public landsCount;
    uint public documentId;
    uint public requestCount;

    mapping(address => User) public UserMapping;

    mapping(address => LandInspector) public InspectorMapping;
    mapping(uint => address[]) allLandInspectorList;
    mapping(address => bool) public RegisteredInspectorMapping;
    mapping(uint => address[]) allUsersList;
    mapping(address => bool) public RegisteredUserMapping;
    mapping(address => uint[]) MyLands;
    mapping(uint => Land) public lands;
    mapping(uint => LandRequest) public LandRequestMapping;
    mapping(address => uint[]) MyReceivedLandRequest;
    mapping(address => uint[]) MySentLandRequest;
    mapping(uint => uint[]) allLandList;
    mapping(uint => uint[]) paymentDoneList;
    mapping(uint => LandHistory[]) landHistory;
    mapping(uint => LandHistory) public landHis;

    mapping(uint => LandInfo) public landinfo;
    mapping(address => UserInfo) public userinfo;
    mapping(uint => LandPriceInfo) public landPriceInfo;
    mapping(uint => TransferInfo) public transferInfo;

    function isContractOwner(address _addr) public view returns (bool) {
        if (_addr == contractOwner) return true;
        else return false;
    }

    function changeContractOwner(address _addr) public {
        if (msg.sender == contractOwner) {
            contractOwner = payable(_addr);
        }
    }

    //-----------------------------------------------LandInspector-----------------------------------------------

    function addLandInspector(
        address _addr,
        bytes32 _name,
        bytes32 _dob,
        uint _cinc,
        bytes32 _designation,
        bytes32 _city,
        bytes32 _district,
        bytes32 _email,
        uint _phone
    ) public returns (bool) {
        // Check if the caller is the contract owner and the inspector is not already registered
        if (
            msg.sender == contractOwner &&
            RegisteredInspectorMapping[_addr] == false
        ) {
            // Check if the CNIC already exists in the inspectors mapping
            for (uint i = 0; i < inspectorsCount; i++) {
                if (
                    InspectorMapping[allLandInspectorList[1][i]].cnic == _cinc
                ) {
                    revert();
                }
            }
            // Update the inspectors mapping and lists
            RegisteredInspectorMapping[_addr] = true;
            inspectorsCount++;
            allLandInspectorList[1].push(_addr);
            InspectorMapping[_addr] = LandInspector(
                inspectorsCount,
                _addr,
                _name,
                _dob,
                _cinc,
                _city,
                _district,
                _designation,
                _email,
                _phone
            );
            return true;
        } else {
            revert();
        }
    }

    function tranferPosting(address _addr, bytes32 _district) public {
        if (
            msg.sender == contractOwner &&
            RegisteredInspectorMapping[_addr] == true
        ) {
            InspectorMapping[_addr].district == _district;
        } else {
            revert();
        }
    }

    function removeLandInspector(address _addr) public {
        if (msg.sender == contractOwner && RegisteredInspectorMapping[_addr]) {
            RegisteredInspectorMapping[_addr] = false;

            uint len = allLandInspectorList[1].length;
            for (uint i = 0; i < len; i++) {
                if (allLandInspectorList[1][i] == _addr) {
                    allLandInspectorList[1][i] = allLandInspectorList[1][
                        len - 1
                    ];
                    allLandInspectorList[1].pop();
                    break;
                }
            }
        } else {
            revert();
        }
    }

    function isLandInspector(address _id) public view returns (bool) {
        if (RegisteredInspectorMapping[_id]) {
            return true;
        } else {
            return false;
        }
    }

    //-----------------------------------------------User-----------------------------------------------

    function registerUser(
        bytes32 _name,
        bytes32 _dob,
        bytes32 _city,
        bytes32 _district,
        uint _cinc,
        string memory _document,
        string memory _profilepic,
        bytes32 _email,
        bytes32 _phone
    ) public {
        if (RegisteredUserMapping[msg.sender] == true) {
            // The user is already registered.
            revert("Allreadey registerd");
        } else {
            // require(!RegisteredUserMapping[msg.sender]);

            RegisteredUserMapping[msg.sender] = true;
            userCount++;
            allUsersList[1].push(msg.sender);
            UserMapping[msg.sender] = User(
                msg.sender,
                _name,
                _dob,
                _city,
                _district,
                _cinc,
                _document,
                _profilepic,
                _email,
                _phone,
                false,
                false,
                block.timestamp
            );
            //emit Registration(msg.sender);
        }
    }

    function verifyUser(address _userId, bool accepted) public {
        if (
            isLandInspector(msg.sender) &&
            _userId != msg.sender &&
            UserMapping[_userId].district ==
            InspectorMapping[msg.sender].district
        ) {
            if (accepted) {
                UserMapping[_userId].isUserVerified = true;
                userinfo[_userId] = UserInfo(
                    msg.sender,
                    block.timestamp,
                    verStatus.accepted
                );
            }
            if (!accepted) {
                UserMapping[_userId].isUserVerified = false;
                userinfo[_userId] = UserInfo(
                    msg.sender,
                    block.timestamp,
                    verStatus.rejected
                );
            }
        } else {
            revert();
        }
    }

    function isUserVerified(address id) public view returns (bool) {
        return UserMapping[id].isUserVerified;
    }

    function ReturnAllUserList() public view returns (address[] memory) {
        return allUsersList[1];
    }

    function addLand(
        uint _area,
        string memory _landAddress,
        bytes32 _district,
        uint _landPrice,
        string memory _allLatiLongi,
        uint _propertyPID,
        string memory _document,
        string memory _landpic
    ) public {
        if (
            UserMapping[msg.sender].isUserVerified &&
            !CheckDuplicatePid(_propertyPID) &&
            _area > 0 &&
            !UserMapping[msg.sender].death
        ) {
            landsCount++;

            lands[landsCount] = Land(
                landsCount,
                _propertyPID,
                _area,
                _landPrice,
                _landAddress,
                _district,
                _allLatiLongi,
                _document,
                _landpic,
                false,
                false,
                payable(msg.sender),
                contractOwner,
                block.timestamp
            );
            MyLands[msg.sender].push(landsCount);
            allLandList[1].push(landsCount);
            landHistory[landsCount].push(
                LandHistory(
                    landsCount,
                    0,
                    0,
                    _area,
                    payable(msg.sender),
                    block.timestamp,
                    0
                )
            );
        } else {
            revert();
        }
    }

    function subplot(uint id, uint newarea, uint numplots) public {
        if (
            UserMapping[msg.sender].isUserVerified &&
            lands[id].isLandVerified &&
            lands[id].ownerAddress == msg.sender &&
            numplots > 0 &&
            newarea < lands[id].area &&
            !lands[id].isforSell &&
            !UserMapping[msg.sender].death
        ) {
            uint parentPID = lands[id].propertyPID;

            LandHistory storage lastHistory = landHistory[id][
                landHistory[id].length - 1
            ];
            uint newNumPlots = lastHistory.childCount + numplots;

            for (uint i = 1; i <= numplots && lands[id].area >= newarea; i++) {
                lands[id].area -= newarea;
                landsCount++;

                uint subplotPID = uint(
                    keccak256(
                        abi.encodePacked(block.timestamp, landsCount, parentPID)
                    )
                );

                // Add the new subplot to the mapping with its unique propertyPID
                lands[landsCount] = Land(
                    landsCount,
                    subplotPID,
                    newarea,
                    lands[id].landPrice,
                    lands[id].landAddress,
                    lands[id].district,
                    lands[id].allLatitudeLongitude,
                    lands[id].document,
                    lands[id].landpic,
                    false,
                    false,
                    payable(msg.sender),
                    contractOwner,
                    block.timestamp
                );
                MyLands[msg.sender].push(landsCount);
                allLandList[1].push(landsCount);

                landHistory[landsCount].push(
                    LandHistory(
                        id,
                        0,
                        0,
                        newarea,
                        payable(msg.sender),
                        block.timestamp,
                        0
                    )
                );
                landinfo[landsCount] = LandInfo(
                    landinfo[id].verfiedby,
                    landinfo[id].verfydate,
                    false,
                    0,
                    landinfo[id].verification
                );

                landinfo[id] = LandInfo(
                    landinfo[id].verfiedby,
                    landinfo[id].verfydate,
                    true,
                    newNumPlots,
                    landinfo[id].verification
                );

                // Calculate the new numplots value by adding the previous numplots value to the new one

                // update history for the parent land
                landHistory[id].push(
                    LandHistory(
                        id,
                        newNumPlots,
                        landsCount,
                        newarea,
                        payable(msg.sender),
                        lands[id].registerdate,
                        block.timestamp
                    )
                );
            }
        } else {
            revert();
        }
    }

    function CheckDuplicatePid(uint _propertyPID) public view returns (bool) {
        for (uint i = 0; i <= landsCount; i++) {
            if (lands[i].propertyPID == _propertyPID) {
                return true;
            }
        }
        return false;
    }

    function getLandHistory(
        uint256 id
    ) public view returns (LandHistory[] memory) {
        return landHistory[id];
    }

    function ReturnAllLandList() public view returns (uint[] memory) {
        return allLandList[1];
    }

    function verifyLand(uint _id, bool accept) public {
        if (
            isLandInspector(msg.sender) &&
            lands[_id].ownerAddress != msg.sender &&
            UserMapping[lands[_id].ownerAddress].isUserVerified &&
            InspectorMapping[msg.sender].district == lands[_id].district
        ) {
            if (accept) {
                lands[_id].isLandVerified = true;
                landinfo[_id] = LandInfo(
                    msg.sender,
                    block.timestamp,
                    true,
                    landinfo[_id].childs,
                    verStatus.accepted
                );
            }
            if (!accept) {
                lands[_id].isLandVerified = false;
                landinfo[_id] = LandInfo(
                    msg.sender,
                    block.timestamp,
                    true,
                    landinfo[_id].childs,
                    verStatus.rejected
                );
            }
        } else {
            revert();
        }
    }

    function myAllLands(address id) public view returns (uint[] memory) {
        return MyLands[id];
    }

    function ReturnAllLandIncpectorList()
        public
        view
        returns (address[] memory)
    {
        return allLandInspectorList[1];
    }

    function AndandRemoveProxyOwner(
        uint landId,
        address payable proxyOwner,
        bool _addRemove
    ) public {
        if (
            lands[landId].ownerAddress == msg.sender &&
            lands[landId].isLandVerified &&
            !lands[landId].isforSell
        ) {
            if (_addRemove) {
                lands[landId].proxyownerAddress = proxyOwner;
            }

            if (!_addRemove && lands[landId].proxyownerAddress == proxyOwner) {
                lands[landId].proxyownerAddress = contractOwner;
            }
        } else {
            revert();
        }
    }

    function changeDetails(
        uint _landId,
        bool s,
        bool p,
        bool i,
        bool c,
        bool sell,
        uint _newPrice,
        string memory _newPic,
        string memory _allLatiLongi
    ) public {
        uint requestId;
        uint[] memory requestIDs = MyReceivedLandRequest[
            lands[_landId].ownerAddress
        ];
        for (uint k = 0; k < requestIDs.length; k++) {
            if (LandRequestMapping[requestIDs[k]].landId == _landId) {
                requestId = requestIDs[k];
                break;
            }
        }

        bool isPaymentDone = LandRequestMapping[requestId].isPaymentDone;
        reqStatus status = LandRequestMapping[requestId].requestStatus;

        if (
            lands[_landId].ownerAddress == msg.sender &&
            lands[_landId].isLandVerified &&
            !isPaymentDone &&
            !(status == reqStatus.accepted)
        ) {
            if (s) {
                lands[_landId].isforSell = sell;
            }
            if (p) {
                lands[_landId].landPrice = _newPrice;
            }
            if (i) {
                lands[_landId].landpic = _newPic;
            }

            if (c) {
                lands[_landId].allLatitudeLongitude = _allLatiLongi;
            }
        } else {
            revert();
        }
    }

    function myReceivedLandRequests() public view returns (uint[] memory) {
        return MyReceivedLandRequest[msg.sender];
    }

    function mySentLandRequests() public view returns (uint[] memory) {
        return MySentLandRequest[msg.sender];
    }

    function acceptRequest(uint _requestId, bool acceptreject) public {
        require(
            LandRequestMapping[_requestId].sellerId == msg.sender,
            "Only the seller can accept or reject a request."
        );
        require(
            LandRequestMapping[_requestId].requestStatus !=
                reqStatus.commpleted &&
                LandRequestMapping[_requestId].requestStatus !=
                reqStatus.paymentdone,
            "Request must not be in 'paymentdone or completed' status to be accepted or rejected."
        );

        if (acceptreject) {
            // Accept the request
            if (LandRequestMapping[_requestId].bidPrice > 0) {
                // Update the land price with the bid price
                LandPriceInfo(
                    _requestId,
                    lands[LandRequestMapping[_requestId].landId].landPrice,
                    LandRequestMapping[_requestId].bidPrice
                );
                lands[LandRequestMapping[_requestId].landId]
                    .landPrice = LandRequestMapping[_requestId].bidPrice;
            }

            LandRequestMapping[_requestId].requestStatus = reqStatus.accepted;

            uint landId = LandRequestMapping[_requestId].landId;

            for (uint i = 1; i <= requestCount; i++) {
                if (
                    LandRequestMapping[i].landId == landId &&
                    i != _requestId &&
                    !LandRequestMapping[i].isPaymentDone
                ) {
                    LandRequestMapping[i].requestStatus = reqStatus.rejected;
                }
            }
        } else {
            LandRequestMapping[_requestId].requestStatus = reqStatus.rejected;
        }
    }

    function requestforBuyWithBid(uint _landId, uint _bidPrice) public {
        uint requestId;
        uint[] memory requestIDs = MyReceivedLandRequest[
            lands[_landId].ownerAddress
        ];
        for (uint k = 0; k < requestIDs.length; k++) {
            if (LandRequestMapping[requestIDs[k]].landId == _landId) {
                requestId = requestIDs[k];
                break;
            }
        }

        bool isPaymentDone = LandRequestMapping[requestId].isPaymentDone;
        reqStatus status = LandRequestMapping[requestId].requestStatus;

        if (
            UserMapping[msg.sender].isUserVerified &&
            lands[_landId].isLandVerified &&
            msg.sender != lands[_landId].ownerAddress &&
            !isPaymentDone &&
            !(status == reqStatus.accepted) &&
            !(status == reqStatus.commpleted)
        ) {
            requestCount++;
            LandRequestMapping[requestCount] = LandRequest(
                requestCount,
                lands[_landId].ownerAddress,
                payable(msg.sender),
                _landId,
                reqStatus.requested,
                _bidPrice,
                false
            );
            MyReceivedLandRequest[lands[_landId].ownerAddress].push(
                requestCount
            );
            MySentLandRequest[msg.sender].push(requestCount);
        } else {
            revert();
        }
    }

    function makePayment(
        address payable _receiver,
        uint _requestId
    ) public payable {
        if (
            LandRequestMapping[_requestId].buyerId == msg.sender &&
            LandRequestMapping[_requestId].requestStatus ==
            reqStatus.accepted &&
            LandRequestMapping[_requestId].requestStatus !=
            reqStatus.paymentdone &&
            LandRequestMapping[_requestId].sellerId == _receiver &&
            msg.value == lands[LandRequestMapping[_requestId].landId].landPrice
        ) {
            LandRequestMapping[_requestId].requestStatus = reqStatus
                .paymentdone;
            LandRequestMapping[_requestId].isPaymentDone = true;
            paymentDoneList[1].push(_requestId);
            _receiver.transfer(msg.value);
        } else {
            revert();
        }
    }

    function returnPaymentDoneList() public view returns (uint[] memory) {
        return paymentDoneList[1];
    }

    function transferDeceasedOwnership(address deceased) public {
        require(isLandInspector(msg.sender));
        UserMapping[deceased].death = true;
        uint[] memory landIds = MyLands[deceased];
        for (uint i = 0; i < landIds.length; i++) {
            uint landId = landIds[i];
            Land storage land = lands[landId];
            if (
                land.ownerAddress == deceased &&
                InspectorMapping[msg.sender].district == land.district
            ) {
                documentId++;
                land.isforSell = false;
                land.ownerAddress = land.proxyownerAddress;
                MyLands[land.proxyownerAddress].push(landId);
                uint[] storage deceasedLands = MyLands[deceased];

                for (uint j = 0; j < deceasedLands.length; j++) {
                    if (deceasedLands[j] == landId) {
                        deceasedLands[j] = deceasedLands[
                            deceasedLands.length - 1
                        ];
                        deceasedLands.pop();
                        break;
                    }
                }

                land.proxyownerAddress = contractOwner;
            }
        }
    }

    function transferOwnership(
        uint _requestId,
        string memory documentUrl,
        address witness
    ) public {
        if (
            isLandInspector(msg.sender) &&
            LandRequestMapping[_requestId].isPaymentDone &&
            InspectorMapping[msg.sender].district ==
            lands[LandRequestMapping[_requestId].landId].district &&
            UserMapping[witness].isUserVerified &&
            witness != LandRequestMapping[_requestId].sellerId &&
            witness != LandRequestMapping[_requestId].buyerId
        ) {
            documentId++;

            LandRequestMapping[_requestId].requestStatus = reqStatus.commpleted;
            MyLands[LandRequestMapping[_requestId].buyerId].push(
                LandRequestMapping[_requestId].landId
            );

            uint len = MyLands[LandRequestMapping[_requestId].sellerId].length;
            for (uint i = 0; i < len; i++) {
                if (
                    MyLands[LandRequestMapping[_requestId].sellerId][i] ==
                    LandRequestMapping[_requestId].landId
                ) {
                    MyLands[LandRequestMapping[_requestId].sellerId][
                        i
                    ] = MyLands[LandRequestMapping[_requestId].sellerId][
                        len - 1
                    ];
                    MyLands[LandRequestMapping[_requestId].sellerId].pop();
                    break;
                }
            }

            transferInfo[documentId] = TransferInfo(
                documentId,
                LandRequestMapping[_requestId].sellerId,
                LandRequestMapping[_requestId].buyerId,
                witness,
                msg.sender,
                LandRequestMapping[_requestId].landId,
                block.timestamp
            );
            lands[LandRequestMapping[_requestId].landId].document = documentUrl;
            lands[LandRequestMapping[_requestId].landId].isforSell = false;
            lands[LandRequestMapping[_requestId].landId]
                .ownerAddress = LandRequestMapping[_requestId].buyerId;
        } else {
            revert();
        }
    }
}
