import {
  APPLICATION_STATUS,
  INSTRUMENT_STATUS,
  CERTIFICATE_STATUS,
} from "./constants";


export const getApplicationStatusClass = (
  status
) => {
  switch (status) {

    case APPLICATION_STATUS.APPROVED:
      return "status-success";

    case APPLICATION_STATUS.REJECTED:
      return "status-danger";

    case APPLICATION_STATUS.SUBMITTED:
    case APPLICATION_STATUS.UNDER_REVIEW:
      return "status-warning";

    case APPLICATION_STATUS.ASSIGNED:
    case APPLICATION_STATUS.INSPECTION_SCHEDULED:
      return "status-info";

    default:
      return "status-default";
  }
};


export const getInstrumentStatusClass = (
  status
) => {
  switch (status) {

    case INSTRUMENT_STATUS.VERIFIED:
      return "status-success";

    case INSTRUMENT_STATUS.EXPIRED:
    case INSTRUMENT_STATUS.SUSPENDED:
      return "status-danger";

    case INSTRUMENT_STATUS.PENDING_VERIFICATION:
      return "status-warning";

    default:
      return "status-default";
  }
};


export const getCertificateStatusClass = (
  status
) => {
  switch (status) {

    case CERTIFICATE_STATUS.VALID:
      return "status-success";

    case CERTIFICATE_STATUS.EXPIRED:
    case CERTIFICATE_STATUS.REVOKED:
      return "status-danger";

    default:
      return "status-default";
  }
};


export const isActiveStatus = (
  status
) => {
  return (
    status === "ACTIVE" ||
    status === "VALID" ||
    status === "VERIFIED"
  );
};