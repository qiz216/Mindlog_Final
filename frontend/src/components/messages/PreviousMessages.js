import React, { useState, useEffect, useLayoutEffect } from "react";
import { Calendar, Badge } from "antd";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { tokenConfig } from "../../actions/auth";
import { connect } from "react-redux";
import store from "../../store";

function PreviousMessages() {
  const [currDate, setCurrDate] = useState(moment());
  const [numRefThisMonth, setNumRefThisMonth] = useState(0);
  const [listOfRefsByDate, setListOfRefsByDate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    setIsLoading(true);
    let tempState = {};
    axios
      .get(
        `/api/messages?year=${currDate.year()}&month=${currDate.month() + 1}`,
        tokenConfig(store.getState)
      )
      .then((res) => {
        setNumRefThisMonth(res.data.length);

        res.data.map((day) => {
          const dayNum = day.created_at.substring(8, 10);

          if (tempState.hasOwnProperty(dayNum)) {
            tempState[dayNum]++;
          } else {
            tempState[dayNum] = 1;
          }
        });
        setListOfRefsByDate(tempState);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [currDate]);

  function dateCellRender(value) {
    let listData = [];
    const currDateRender =
      value.date() < 10
        ? "0" + value.date().toString()
        : value.date().toString();

    if (
      listOfRefsByDate.hasOwnProperty(currDateRender) &&
      value.month() === currDate.month() &&
      value.year() === currDate.year()
    ) {
      let reflectionString = "Reflection";
      if (listOfRefsByDate[currDateRender] > 1) {
        reflectionString = "Reflections";
      }

      listData = [
        {
          type: "success",
          content: `${listOfRefsByDate[currDateRender]} ${reflectionString}`,
        },
      ];
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
    if (
      value.month() === currDate.month() &&
      value.year() === currDate.year()
    ) {
      const currDateSelected =
        value.date() < 10
          ? "0" + value.date().toString()
          : value.date().toString();
      if (listOfRefsByDate.hasOwnProperty(currDateSelected)) {
        setDateSelected(true);
        setSelectedDay(value);
      }
    }
  }
  function onChange(value) {
    setCurrDate(value);
  }

  if (dateSelected) {
    return (
      <Redirect
        push
        to={{
          pathname: "/previous_messages_specific_day",
          state: { requestedDay: selectedDay },
        }}
      />
    );
  }

  return (
    <div>
      <h3>
        You have {numRefThisMonth}{" "}
        {numRefThisMonth > 1 ? "Relections" : "Reflection"} this month
      </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Calendar
          dateCellRender={dateCellRender}
          onChange={onChange}
          onSelect={onSelect}
          value={currDate}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PreviousMessages);
