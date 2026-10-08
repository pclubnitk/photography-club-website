import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const AuthTest = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        },
      );

      console.log("Backend Response:", data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default AuthTest;
