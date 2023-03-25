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
  { name: "Search Details", icon: FiSettings, src: "/SearchDetail" },
];
export const InspectorLinks = [
  { name: "Home", icon: FiHome, src: "/Inspector" },
  { name: "Add Inspector", icon: FiTrendingUp, src: "/Inspector/AddInspector" },
  { name: "View the List", icon: FiCompass, src: "/Inspector/ViewtheList" },
  { name: "Change Admin", icon: FiStar, src: "/Inspector/ChangeAdmin" },
  { name: "Search Details", icon: FiSettings, src: "/SearchDetail" },
];
