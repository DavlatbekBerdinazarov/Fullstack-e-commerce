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
  import { useNavigate } from "react-router-dom"
  
  export default function Login() {
    const [switchLogin, setSwitchLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    
    const onSubmitSignIn = (e) => {
      e.preventDefault();

      if (email == "davlatberdinazarov@gmail.com" && password == "123") {
        navigate('/dashboard');
      }
      else {
        alert('Please enter correct form');
      }
    };

    const onSubmitSignUp = (e) => {
      e.preventDefault();
      navigate('/dashboard');
    };
  
  
    return (
      <div className="bg-gradient-to-b from-[#fde1ff] to-[#ffffff] h-[90vh]">
        {switchLogin ? (<form
          onSubmit={onSubmitSignIn}
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
              <Input onChange={e => setEmail(e.target.value)} type="email" label="Email" size="lg" required />
              <Input onChange={e => setPassword(e.target.value)} type="password" label="Password" size="lg" required />
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
                  onClick={() => setSwitchLogin(prev => !prev)}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>)
          :
        (<form
          onSubmit={onSubmitSignUp}
          className="h-full flex items-center justify-center"
        >
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
              <Input type="text" label="Username" size="lg" required />
              <Input type="email" label="Email" size="lg" required />
              <Input type="password" label="Password" size="lg" required />
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
                  onClick={() => setSwitchLogin(prev => !prev)}
                >
                  Sign in
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>)}
      </div>
    );
  }
  