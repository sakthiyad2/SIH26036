import {
  useEffect,
  useState
} from "react";

import inspectorService
  from "../../services/inspectorService";

import Alert
  from "../../components/common/Alert";


function InspectionHistory() {

  const [
    history,
    setHistory
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // ==========================================================
  // LOAD HISTORY
  // ==========================================================

  useEffect(() => {

    loadHistory();

  }, []);


  const loadHistory =
    async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await inspectorService
            .getInspectionHistory();


        if (
          response.data?.success
        ) {

          setHistory(
            response.data.data || []
          );

        } else {

          setError(
            response.data?.message ||
            "Failed to load history."
          );
        }


      } catch (err) {

        console.error(
          "History error:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load inspection history."
        );

      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="page">

        <div className="page-header">

          <h1>
            Inspection History
          </h1>

          <p>
            Loading inspection history...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="page">

      <div className="page-header">

        <h1>
          Inspection History
        </h1>

      </div>


      <Alert
        message={error}
        type="error"
        onClose={() =>
          setError("")
        }
      />


      {
        history.length === 0 ? (

          <div className="empty-state">

            <h3>
              No Inspection History
            </h3>

            <p>
              Completed inspections will appear here.
            </p>

          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    Application
                  </th>

                  <th>
                    Instrument
                  </th>

                  <th>
                    Serial Number
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Result
                  </th>

                  <th>
                    Compliance
                  </th>

                </tr>

              </thead>


              <tbody>

                {
                  history.map(
                    (item) => (

                      <tr
                        key={
                          item.inspection_id
                        }
                      >

                        <td>
                          {
                            item.application_number
                          }
                        </td>

                        <td>
                          {
                            item.instrument_name
                          }
                        </td>

                        <td>
                          {
                            item.serial_number
                          }
                        </td>

                        <td>
                          {
                            item.result_date ||
                            item.scheduled_date ||
                            "-"
                          }
                        </td>

                        <td>

                          {
                            item.result_status ||
                            "-"
                          }

                        </td>

                        <td>

                          {
                            item.compliance_status ||
                            "-"
                          }

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>
  );
}


export default InspectionHistory;