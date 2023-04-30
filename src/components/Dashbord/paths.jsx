import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
export const AdminLink = [
  { name: "Home", icon: FiHome, src: "/Admin" },
  { name: "Add Inspector", icon: FiTrendingUp, src: "/Admin/AddInspector" },
  { name: "View the List", icon: FiCompass, src: "/Admin/ViewtheList" },
  { name: "Change Admin", icon: FiStar, src: "/Admin/ChangeAdmin" },
  { name: "Search Details", icon: FiSettings, src: "/Admin/SearchDetails" },
];
export const InspectorLinks = [
  { name: "Home", icon: FiHome, src: "/Inspector" },
  { name: "Verify User", icon: FiTrendingUp, src: "/Inspector/VerifyUser" },
  { name: "Verify Land", icon: FiCompass, src: "/Inspector/VerifyLand" },
  {
    name: "Transfer Ownership",
    icon: FiStar,
    src: "/Inspector/TransferOwnership",
  },
];

export const UserLinks = [
  { name: "Home", icon: FiHome, src: "/User" },
  { name: "Land Market", icon: FiTrendingUp, src: "/User/LandMarket" },
  { name: "My Lands", icon: FiCompass, src: "/User/MyLands" },

  { name: "Send Requests", icon: FiCompass, src: "/User/SendRequests" },
  { name: "Recived Requests", icon: FiCompass, src: "/User/RecivedRequests" },

  {
    name: "Register Land",
    icon: FiStar,
    src: "/User/RegisterLand",
  },
];
