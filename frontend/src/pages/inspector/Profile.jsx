import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Inspector Profile</h1>
      </div>

      <div className="form-card">
        <Input
          label="Name"
          name="name"
          value={user?.name || "Inspector"}
          disabled
          onChange={() => {}}
        />

        <Input
          label="Email"
          name="email"
          value={user?.email || ""}
          disabled
          onChange={() => {}}
        />

        <Input
          label="Employee Code"
          name="employeeCode"
          value="INS-001"
          disabled
          onChange={() => {}}
        />

        <Input
          label="Designation"
          name="designation"
          value="Verification Inspector"
          disabled
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default Profile;