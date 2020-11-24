import React, { useEffect, useState } from "react";

import { fetchAPI, BASE_URL } from "../api";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  fetchAPI(BASE_URL + `/activities`).then((data) => {
    setActivities(data);
  });

  return (
    <div className="Activities">
      {activities.map((activity, index) => {
        return (
          <div className="activity" key={index}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
