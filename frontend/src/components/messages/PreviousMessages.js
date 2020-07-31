import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import { func } from "prop-types";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";
import { connect } from "react-redux";
import store from "../../store";

function PreviousMessages() {
  const [month, setMonth] = useState(moment().month() + 1);
  const [numRefThisMonth, setNumRefThisMonth] = useState(0);
  const [listOfRefsByDate, setListOfRefsByDate] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    console.log(`Month is ${month}`);
    setIsLoading(true);
    axios
      .get(`/api/messages?month=${month}`, tokenConfig(store.getState))
      .then((res) => {
        setNumRefThisMonth(res.data.length);
        //console.log(`Main data:: ${res}`);
        console.log(res);

        res.data.map((day) => {
          const dayNum = day.created_at.substring(8, 10);
          console.log(dayNum);
          if (listOfRefsByDate.has(dayNum)) {
            //setListOfRefsByDate(...listOfRefsByDate, dayNum : listOfRefsByDate.get(dayNum) + 1 );
            listOfRefsByDate.set(dayNum, listOfRefsByDate.get(dayNum) + 1);
            console.log(listOfRefsByDate);
          } else {
            listOfRefsByDate.set(dayNum, 1);
            console.log(listOfRefsByDate);
          }
        });

        setIsLoading(false);
        console.log("Loading is over");
        //console.log(listOfRefsByDate);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [month]);

  function dateCellRender(value) {
    let listData = [];

    if (listOfRefsByDate.has(value.date().toString())) {
      listData = [
        {
          type: "success",
          content: `${listOfRefsByDate.get(
            value.date().toString()
          )} Reflections`,
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
  function onSelect(value) {
    //console.log("hello");
    if (value.month() + 1 == month) {
      console.log(value);
      if (listOfRefsByDate.has(value.date().toString())) {
        console.log(`The date is ${value.date()}`);
        setDateSelected(true);
        setSelectedDay(value);

        console.log(selectedDay);
      } else {
        console.log("You did not write that day");
      }
    }
  }
  //this handles when we change the month
  function onPanelChange(date) {
    console.log("Month changes");
    setListOfRefsByDate(new Map());
    setMonth(date.month() + 1);
    console.log(`The current month is ${date.month() + 1}`);
  }

  if (dateSelected) {
    //setDateSelected(false);

    return (
      <Redirect
        push
        to={{
          pathname: "/previous_messages_specific_day",
          state: { requestedDay: selectedDay },
        }}
      />
    );
    //return <Redirect to="previous_messages_specific_day" />;
  }

  return (
    <div>
      <h3>You have {numRefThisMonth} reflections this month</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Calendar
          dateCellRender={dateCellRender}
          onPanelChange={onPanelChange}
          onSelect={onSelect}
          //defaultValue={onDefaultSelect}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PreviousMessages);
