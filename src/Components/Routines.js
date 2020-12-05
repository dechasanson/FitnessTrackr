import React from "react";



const Routines = (props) => {
  const { routineList, filterTerm, setFilterTerm} = props;

  return (
    <div className="routines">
      {routineList
        .filter(function (routine) {
          return routine.creatorName.toLowerCase().includes(filterTerm.toLowerCase()) || routine.name.toLowerCase().includes(filterTerm.toLowerCase());
           })
        .map((routine, index) => {
          return (
            <div className="routine" key={index}>
              <h3>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
              <span><a className = "tag" href = "#" 
             onClick = {(event) => {
              //  console.log(event.target.text)
              setFilterTerm(routine.creatorName);
             }}>See All Routines by {" "}
               {routine.creatorName}
             </a>
             </span>
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
