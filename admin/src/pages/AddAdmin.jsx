import { Button, Card } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddAdmin() {
  const [login, setLogin] = useState(null)
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState(null)

  const navigate = useNavigate();


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("login", login);
    formdata.append("password",password);

    axios
      .post("http://localhost:4545/api/register-admin", formdata, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full pl-5 pt-5 ">
      <Card className="h-[85vh] xl:w-3/4 py-8 px-16 bg-[#f5faff]">
        <h2 className="flex items-center justify-center gap-3 font-semibold text-2xl text-black pb-4">
          Add Admin
        </h2>
        <form onSubmit={onSubmitHandler} className="flex gap-12 w-full">
          <div>
            <div className="w-36 rounded-md">
              <img
                className=" rounded-md shadow-lg"
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                alt="img here"
              />
            </div>
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center px-4 py-2 bg-gray-100 mt-4 hover:bg-gray-300 rounded-md shadow-md text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Choose File</span>
                <input id="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
          </div>
          <div className="max-h-full w-2/3">
            <label htmlFor="login" className="my-3">
              First Name and Last Name
            </label>
            <div className="w-full my-2">
              <Input
                id="login"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                type="text"
                placeholder="Fullname"
                className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <label htmlFor="password" className="my-3">
              Password
            </label>
            <div className="w-full my-2">
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password}"
                placeholder="Fullname"
                className="!border !border-gray-300 bg-white rounded-none py-6 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>

            <Button type="submit" className="rounded-none py-3.5 mt-4 px-10">
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
