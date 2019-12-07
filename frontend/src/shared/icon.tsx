import { library } from "@fortawesome/fontawesome-svg-core";

//regular
import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons/faCheckSquare";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";

//solid
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons/faEuroSign";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons/faDollarSign";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons/faRubleSign";

//brand
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  //regular
  faSquare,
  faCheckSquare,
  faCheckCircle,
  faCircle,
  //solid
  faAngleRight,
  faSignOutAlt,
  faUser,
  faEuroSign,
  faDollarSign,
  faRubleSign,
  //brand
  faGoogle,
  faVk,
  faTwitter
);

export type ImportedIcon =
  | "check-square"
  | "square"
  | "angle-right"
  | "google"
  | "vk"
  | "twitter"
  | "sign-out-alt"
  | "user"
  | "check-circle"
  | "circle"
  | 'euro-sign'
  | 'dollar-sign'
  | 'ruble-sign';

export interface Props extends React.HTMLAttributes<any> {
  className?: string;
  spin?: boolean;
  prefix?: "fas" | "far" | "fab";
  name: ImportedIcon;
}

export const Icon: React.FC<Props> = ({
  prefix = "fas",
  name,
  spin,
  className,
  ...other
}) => {
  return (
    <FontAwesomeIcon
      icon={[prefix, name]}
      spin={spin}
      {...other}
    ></FontAwesomeIcon>
  );
};
