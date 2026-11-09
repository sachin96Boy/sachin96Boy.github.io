import { TbBriefcase, TbFolders, TbHome, TbLayoutGrid, TbMail } from "react-icons/tb";

/** Primary navigation, shared by the desktop icon rail and the mobile drawer. */
export const navigation = [
  { to: "/", label: "Home", icon: TbHome, end: true },
  { to: "/services", label: "Services", icon: TbLayoutGrid },
  { to: "/portfolio", label: "Portfolio", icon: TbFolders },
  { to: "/workhistory", label: "Work History", icon: TbBriefcase },
  { to: "/contact", label: "Contact", icon: TbMail },
];
