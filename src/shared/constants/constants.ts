import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TuneIcon from "@mui/icons-material/Tune";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import {Modules} from "../../submodule/constants/constants";

export const SideBarRoutesList = [
  {
    text: "Subscriptions",
    icon: CheckCircleOutlineIcon,
    to: "/subscription", // <-- add link targets
    activeSideBar: Modules.Subscription,
  },
  {
    text: "Catalog",
    icon: ContentCopyIcon,
    to:"/catalog",
    activeSideBar: Modules.Catalog,
  },
  {
    text: "Orders",
    icon: TuneIcon,
    to:"/order",
    activeSideBar: Modules.Order,
  },
  {
    text: "Support",
    icon: HeadsetMicIcon,
    to:"/support",
    activeSideBar: Modules.Support,
  }
];