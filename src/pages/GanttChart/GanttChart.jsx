import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import events from "./events";
import moment from "moment";

import "./GanttChart.scss";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const GanttChart = () => {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <div className="App">
      <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh", width: "100%" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default GanttChart;
