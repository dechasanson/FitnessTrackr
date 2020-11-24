import React, { useEffect, useState } from "react";

import { fetchAPI, BASE_URL } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  fetchAPI(BASE_URL + `/routines`).then((data) => {
    setRoutines(data);
  });

  return (
    <div className="routines">
      {routines.map((routine, index) => {
        return (
          <div className="activity" key={index}>
            <h3>{routine.name}</h3>
            <p>{routine.goal}</p>
            <p>{routine.creatorName}</p>
            {routine.activities.map((activity, index) => {
              return (
                <div className="activity" key={index}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <p>{activity.duration}</p>
                  <p>{activity.count}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Routines;
