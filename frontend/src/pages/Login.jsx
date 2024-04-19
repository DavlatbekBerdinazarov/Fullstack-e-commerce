import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios
import { useNavigate } from "react-router-dom";
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

export default function Login() {
  const [switchLogin, setSwitchLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4545/api/login", {
        email: email,
        password: password,
      });
      const token = response.data.token; // Assuming the token is returned in the response
      const user = response.data.user;
      localStorage.setItem("token", token); // Store the token in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Store the user in localStorage
      console.log(response.data); // You can redirect here
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again."); // Or any error message from server
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4545/api/register", {
        username: username,
        email: email,
        password: password,
      });
      const token = response.data.token; // Assuming the token is returned in the response
      const user = response.data.user;
      localStorage.setItem("token", token); // Store the token in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Store the user in localStorage
      console.log(response.data);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again."); // Or any error message from server
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] h-[90vh]">
      {switchLogin ? (
        <form className="h-full flex items-center justify-center">
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
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                size="lg"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                size="lg"
                required
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                size="lg"
                variant="gradient"
                color="red"
                type="submit"
                onClick={loginUser}
                fullWidth
              >
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={() => setSwitchLogin((prev) => !prev)}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <form className="h-full flex items-center justify-center">
          <Card className="w-[560px]">
            <CardHeader
              variant="gradient"
              color="red"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                label="Username"
                size="lg"
                required
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                size="lg"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                size="lg"
                required
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                size="lg"
                variant="gradient"
                color="red"
                type="submit"
                onClick={registerUser}
                fullWidth
              >
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={() => setSwitchLogin((prev) => !prev)}
                >
                  Sign in
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
}
