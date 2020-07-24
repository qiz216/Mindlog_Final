import React, { useEffect } from "react";
import { Calendar, Badge } from "antd";
import { func } from "prop-types";
import moment from "moment";

function getListData(value) {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [{ type: "success", content: "Reflections" }];
      break;
    case 10:
      listData = [{ type: "success", content: "Reflections " }];
      break;
    case 15:
      listData = [{ type: "success", content: "Reflections" }];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <dl className="events">
      {listData.map((item) => (
        <dd key={item.content}>
          <Badge status={item.type} text={item.content} />
        </dd>
      ))}
    </dl>
  );
}

export default function PreviousMessages() {
  //when a date is selected
  function onSelect(date) {
    // console.log(date.date());
  }
  //this handles when we change the month
  function onPanelChange(date) {
    console.log(date.month());
  }
  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
      />
    </div>
  );
}
