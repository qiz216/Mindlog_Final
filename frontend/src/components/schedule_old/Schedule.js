import React, { Fragment } from "react";
import Calendar from "./Calendar";
import Dates from "./Dates";

export default function Schedule() {
  return (
    <Fragment>
      <Calendar />
      <Dates />
    </Fragment>
  );
}
