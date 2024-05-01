import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  console.log(login, password);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4545/api/login-admin", {
        login: login,
        password: password,
      });
      console.log(login, password);
      const token = response.data.adminToken; // Assuming the token is returned in the response
      const admin = response.data.admin;
      localStorage.setItem("adminToken", token); // Store the token in localStorage
      let adminName = admin.login
      let adminFile = admin.file
      localStorage.setItem("admin", JSON.stringify(adminName)); // Store the user in localStorage
      localStorage.setItem("adminImg", JSON.stringify(adminFile));
      localStorage.setItem("id", JSON.stringify(response.data.admin._id));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again."); // Or any error message from server
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] h-[90vh]">
      <form
        onSubmit={loginUser}
        className="h-full flex items-center justify-center"
      >
        <Card className="w-[560px]">
          <CardHeader
            variant="gradient"
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              label="Login as fullname"
              size="lg"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              size="lg"
              variant="gradient"
              color="red"
              type="submit"
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Only superadmin can add admins
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
