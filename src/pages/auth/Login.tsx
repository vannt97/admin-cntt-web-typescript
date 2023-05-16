import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LoadingLayOut } from "../../components/Loading/Loading";
import { fetchLogin } from "../../services/loginApi";
import { RequestLogin } from "../../services/types";
import { getCookie, setCookie } from "../../utils/cookieUtil";

interface dataResponseLogin {
  role: string;
  token: string;
  refreshToken: string;
  email: string;
  id: string;
  name: string;
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  let history = useHistory();
  let location = useLocation();
  let { from }: any = location.state || { from: { pathname: "/" } };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý đăng nhập ở đây
    let requestLogin: RequestLogin = { email, password };
    setIsLoading(true);
    try {
      const data = (await fetchLogin(requestLogin)) as dataResponseLogin;
      setCookie("tk", data.token);
      setCookie("rtk", data.refreshToken);
      setCookie("c_user", data.name);
      setCookie("role", data.role);
      setCookie("id", data.id);
      setCookie("email", data.email);
      history.replace(from);
    } catch (error: any) {
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-primary">
      {isLoading ? <LoadingLayOut /> : ""}
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col-xl-5 col-lg-8 col-md-10 col-12">
            <div
              className="card o-hidden border-0 shadow-lg my-5"
              style={{ minHeight: 350 }}
            >
              <div className="card-body p-0 d-flex align-items-center">
                <div className="row w-100 align-items-center justify-content-center m-0">
                  <div className="col-lg-12">
                    <div className="p-sm-4 p-2">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form
                        id="form-sign-in"
                        className="user"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group">
                          <input
                            required
                            name="email"
                            type="email"
                            className="form-control form-control-user"
                            id="inputAccount"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email..."
                            onChange={handleEmailChange}
                          />
                        </div>

                        <div className="form-group m-0">
                          <input
                            onChange={handlePasswordChange}
                            required
                            name="password"
                            type="password"
                            className="form-control form-control-user"
                            id="inputPassword"
                            placeholder="Password"
                            minLength={8}
                          />
                        </div>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: 40 }}
                        >
                          {error ? (
                            <div
                              className="form-group m-0 "
                              id="error-username-pass"
                            >
                              <div className="text-center text-danger">
                                Username or password incorrect
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <input
                          id="submit_login"
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                          value="Login"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
