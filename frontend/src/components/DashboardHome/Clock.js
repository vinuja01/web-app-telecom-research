import React, { useState, useEffect } from "react";
import moment from "moment";

const Clock = () => {
  const [time, setTime] = useState(moment().format("HH:mm:ss"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{time}</div>;
};

export default Clock;
