import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Service",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  // {
  //   title: "Sub Services",
  //   path: "/subservice",
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: "nav-text",
  // },
  {
    title: "Order",
    path: "/order",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Provider",
    path: "/provider",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Customer",
    path: "/customer",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Feedback",
    path: "/feedback",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  
];
