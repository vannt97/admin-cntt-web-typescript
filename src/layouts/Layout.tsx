import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faEnvelope,
  faGamepad,
  faGauge,
  faMagnifyingGlass,
  faTag,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Link,
  Redirect,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import avartarImage from "../assets/svgs/undraw_profile.svg";
import routes, { route } from "../routes";
import $ from "jquery";
import "./Layout.css";
import { deleteAllCookies, getCookie, setCookie } from "../utils/cookieUtil";
const labelsUI = [
  {
    path: "/users",
    name: "Users",
    icon: <FontAwesomeIcon icon={faUsersRectangle} />,
  },
  {
    path: "/categories",
    name: "Categories",
    icon: <FontAwesomeIcon icon={faGamepad} />,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: <FontAwesomeIcon icon={faUsersRectangle} />,
  },
  {
    path: "/tags",
    name: "Tags",
    icon: <FontAwesomeIcon icon={faTag} />,
  },
];
export default function Layout(props: any) {
  const [isToggled, setToggle] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from }: any = location.state || { from: { pathname: "/login" } };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const output = document.getElementById("username-Tk");
    if (output) {
      output.innerHTML = localStorage.getItem("c_user") as string;
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [props]);

  useEffect(() => {
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);

  const getRoutes = (routes: route[]) => {
    return routes.map((route, key) => {
      return (
        <Route
          exact
          path={route.path}
          render={({ location }) => {
            if (getCookie("tk")) {
              if (route.layout) {
                return (
                  <route.layout {...props}>
                    <route.component />
                  </route.layout>
                );
              } else {
                return <route.component {...props}></route.component>;
              }
            } else {
              setCookie("tk", "");
              setCookie("rtk", "");
              // setCookie("c_user", "");
              localStorage.setItem("c_user","");
              setCookie("role", "");
              setCookie("id", "");
              setCookie("email", "");
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                />
              );
            }
          }}
          key={key}
        ></Route>
      );
    });
  };

  const handleClickSidebar = () => {
    $("page-top").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const handleResize = (ev: UIEvent) => {
    // // Toggle the side navigation when window is resized below 480px
    if (window.innerWidth < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
    }
  };
  const handleClickWindow = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("#dropdown-profile")) {
      (e.target as HTMLElement)
        .closest("#dropdown-profile")
        ?.classList.toggle("show");
      document
        .getElementById("dropdown-menu-content")
        ?.classList.toggle("show");
    } else {
      document.getElementById("dropdown-profile")?.classList.remove("show");
      document
        .getElementById("dropdown-menu-content")
        ?.classList.remove("show");
    }
    // document.getElementById("dropdown-profile")?.classList.remove("show");
    // document.getElementById("dropdown-menu-content")?.classList.remove("show");
  };

  const renderLabelUI = () => {
    return labelsUI.map((data, index) => {
      let isActive = props.location.pathname == data.path ? "active" : "";
      return (
        <li className={`nav-item ${isActive}`} key={index}>
          <Link to={data.path} className="nav-link">
            {data.icon}
            <span>{data.name}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <Link
              to="/"
              className="sidebar-brand d-flex align-items-center justify-content-center"
            >
              <div className="sidebar-brand-text mx-3">Admin Web Blog</div>
            </Link>
            <hr className="sidebar-divider my-0"></hr>
            <li
              className={`nav-item ${
                props.location.pathname == "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                <FontAwesomeIcon className="mr-2" icon={faGauge} />
                <span>Dashboard</span>
              </Link>
            </li>
            <hr className="sidebar-divider"></hr>
            <div className="sidebar-heading">Addons</div>

            {renderLabelUI()}

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block"></hr>

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0 btn btn-circle btn-primary"
                id="sidebarToggle"
                onClick={handleClickSidebar}
              >
                {isToggled ? (
                  <FontAwesomeIcon icon={faAngleRight} />
                ) : (
                  <FontAwesomeIcon icon={faAngleLeft} />
                )}
              </button>
              
            </div>
          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <!-- Topbar --> */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>

                {/* <!-- Topbar Search --> */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  </div>
                </form>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                  {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/* <!-- Nav Item - User Information --> */}
                  <li
                    id="dropdown-profile"
                    className="nav-item dropdown no-arrow"
                    // onClick={(e) => {
                    //   e.currentTarget.classList.toggle("show");
                    //   document
                    //     .getElementById("dropdown-menu-content")
                    //     ?.classList.toggle("show");
                    // }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span
                        id="username-Tk"
                        className="mr-2 d-none d-lg-inline text-gray-600 small"
                      >
                        User name
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src={avartarImage}
                      />
                    </a>
                    {/* <!-- Dropdown - User Information --> */}
                    <div
                      id="dropdown-menu-content"
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                        onClick={() => {
                          deleteAllCookies();
                          history.replace(from);
                        }}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">{getRoutes(routes)}</div>
              {/* <!-- /.container-fluid --> */}
            </div>

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
        </div>
      </div>
      {/* // <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <FontAwesomeIcon icon={faAngleUp} />
      </a>
    </>
  );
}
