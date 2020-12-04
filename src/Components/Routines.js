import React from "react";

const Routines = (props) => {
  const { routineList } = props;

  return (
    <div className="routines">
      {routineList.map((routine, index) => {
        return (
          <div className="routine" key={index}>
            <h3>{routine.name}</h3>
            <p>Goal: {routine.goal}</p>
            <p>Created by: {routine.creatorName}</p>
            <h4>Activities in this Routine:</h4>
            {routine.activities.map((activity, index) => {
              return (
                <div className="activity" key={index}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
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
