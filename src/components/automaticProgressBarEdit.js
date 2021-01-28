import React from "react";
import LinearProgressWithValueLabel from "./manualProgressBar";

function ProgressBarEdit(props) {
  console.log(props.text);

  // check to see if the user clicked outside of this component

  return (
    <span>
      <span>
        <LinearProgressWithValueLabel
          progressPercentage={props.text}
        ></LinearProgressWithValueLabel>
      </span>
    </span>
  );
}

export default ProgressBarEdit;
