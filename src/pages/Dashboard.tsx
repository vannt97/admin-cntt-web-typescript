import {
  faEnvelope,
  faGamepad,
  faTag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingGif } from "../components/Loading/Loading";
import { getCountCategory } from "../services/APIcategory";
import { getCountPost } from "../services/APIpost";
import { getCountTag } from "../services/APItag";
import { getCountUsers } from "../services/APIuser";
export default function Dashboard() {
  const [numUser, setNumUser] = useState(null);
  const [numTag, setNumTag] = useState(null);
  const [numPost, setNumPost] = useState(null);
  const [numCategory, setNumCategory] = useState(null);

  useEffect(() => {
    const fetchNumUser = async () => {
      await getCountUsers((res: any) => {
        setNumUser(res.data);
      });
    };

    const fetchNumTag = async () => {
      await getCountTag((res: any) => {
        setNumTag(res.data);
      });
    };

    const fetchNumPost = async () => {
      await getCountPost((res: any) => {
        setNumPost(res.data);
      });
    };

    const fetchNumCategory = async () => {
      await getCountCategory((res: any) => {
        setNumCategory(res.data);
      });
    };

    fetchNumUser();
    fetchNumTag();
    fetchNumPost();
    fetchNumCategory();
  }, []);
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <Link
          to="/"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </Link>
      </div>
      <div className="row" id="content-dashboard">
        {/* Posts */}
        <div className="col-xl-3 col-md-6 mb-4">
          <Link
            to="/posts"
            className="card border-left-primary shadow h-100 py-2"
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Posts
                  </div>
                  <div
                    id="dashboard-blogs"
                    className="h5 mb-0 font-weight-bold text-gray-800"
                  >
                    {numPost ? numPost : <LoadingGif />}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="2xl"
                    style={{ color: "#dddfeb" }}
                  />
                  {/* <i className="fas fa-envelope fa-2x text-gray-300"></i> */}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <!--   Categories          --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <Link
            to="/categories"
            className="card border-left-success shadow h-100 py-2"
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Categories
                  </div>
                  <div
                    id="dashboard-categories"
                    className="h5 mb-0 font-weight-bold text-gray-800"
                  >
                    {numCategory ? numCategory : <LoadingGif />}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    size="2xl"
                    style={{ color: "#dddfeb" }}
                    icon={faGamepad}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <!-- users --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <Link to="/users" className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Users
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div
                        id="dashboard-accounts"
                        className="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                      >
                        {numUser ? numUser : <LoadingGif />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    size="2xl"
                    style={{ color: "#dddfeb" }}
                    icon={faUsers}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* tags */}
        <div className="col-xl-3 col-md-6 mb-4">
          <Link
            to="tags"
            className="card border-left-warning shadow h-100 py-2"
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Tags
                  </div>
                  <div
                    className="h5 mb-0 font-weight-bold text-gray-800"
                    id="dashboard-tags"
                  >
                    {numTag ? numTag : <LoadingGif />}
                  </div>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    size="2xl"
                    style={{ color: "#dddfeb" }}
                    icon={faTag}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
