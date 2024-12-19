import React, { useEffect, useState } from "react";
import { format } from "date-fns";

function CurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h6>{format(currentDateTime, "hh:mm:ss")}</h6>
      <h6>{format(currentDateTime, "yyyy/MM/dd")}</h6>
    </div>
  );
}

export default CurrentDateTime;
