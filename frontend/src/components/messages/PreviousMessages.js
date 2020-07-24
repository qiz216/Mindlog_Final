import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import { func } from "prop-types";
import moment from "moment";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";
import { connect } from "react-redux";
import store from "../../store";

function PreviousMessages() {
  const [month, setMonth] = useState(moment().month() + 1);
  const [numRefThisMonth, setNumRefThisMonth] = useState(0);
  const [listOfRefsByDate, setListOfRefsByDate] = useState(new Map());

  useEffect(() => {
    console.log(`Month is ${month}`);
    axios
      .get(`/api/messages?month=${month}`, tokenConfig(store.getState))
      .then((res) => {
        setNumRefThisMonth(res.data.length);

        console.log(res);

        res.data.map((day) => {
          const dayNum = day.created_at.substring(8, 10);
          console.log(dayNum);
          if (listOfRefsByDate.has(dayNum)) {
            //setListOfRefsByDate(...listOfRefsByDate, dayNum : listOfRefsByDate.get(dayNum) + 1 );
            listOfRefsByDate.set(dayNum, listOfRefsByDate.get(dayNum) + 1);
          } else {
            listOfRefsByDate.set(dayNum, 1);
          }
        });
        console.log(listOfRefsByDate);
      })
      .catch((err) => console.log(err));
  }, [month]);

  function getListData(value) {
    let listData;

    switch (value.date()) {
      case 11:
        listData = [{ type: "success", content: "Reflections" }];
        break;
      case 20:
        listData = [{ type: "success", content: "Reflections " }];
        break;
      case 22:
        listData = [{ type: "success", content: "Reflections" }];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    //const listData = getListData(value);
    let listData = [];
    if (listOfRefsByDate.has(15)) {
      console.log("We got it");
    }
    console.log(`This is working ${listOfRefsByDate}`);

    if (listOfRefsByDate.has(value.date().toString())) {
      listData = [
        {
          type: "success",
          content: `${listOfRefsByDate.get(value.date())} Reflections`,
        },
      ];
    } else {
      //console.log("Something is up");
    }
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

  //when a date is selected
  function onSelect(date) {
    console.log(`The date is ${date.date()}`);
  }
  //this handles when we change the month
  function onPanelChange(date) {
    setListOfRefsByDate(new Map());
    setMonth(date.month() + 1);
    console.log(date.month());
  }
  return (
    <div>
      <h3>You have {numRefThisMonth} reflections this month</h3>
      <Calendar
        dateCellRender={dateCellRender}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PreviousMessages);
