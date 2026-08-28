import { useNavigate } from "react-router-dom";

import Button
  from "../../components/common/Button";


function MeasurementEntry() {

  const navigate =
    useNavigate();


  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Measurement Entry
        </h1>

        <p>
          Measurement values are entered
          during the inspection process.
        </p>

      </div>


      <div className="details-card">

        <h2>
          Inspection Measurement
        </h2>

        <p>
          Please open the assigned
          application and start the
          inspection to enter observed
          measurements.
        </p>


        <Button
          onClick={() =>
            navigate(
              "/inspector/applications"
            )
          }
        >
          View Assigned Applications
        </Button>

      </div>

    </div>
  );
}


export default MeasurementEntry;