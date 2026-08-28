import { useNavigate } from "react-router-dom";

import Button
  from "../../components/common/Button";


function ScheduleInspection() {

  const navigate =
    useNavigate();


  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Schedule Inspection
        </h1>

        <p>
          Inspection scheduling is
          managed by the government
          administration.
        </p>

      </div>


      <div className="details-card">

        <h2>
          Inspection Scheduling
        </h2>

        <p>
          Once an application is reviewed
          and assigned to you, the scheduled
          date and time will appear in your
          assigned applications.
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


export default ScheduleInspection;