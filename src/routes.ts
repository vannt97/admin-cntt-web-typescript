import Table from "./layouts/Table/Table";
import AddUser from "./pages/AddUser";
import AddEditUser from "./pages/AddUser";
import Login from "./pages/auth/Login";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import EditUser from "./pages/EditUser";
import NotFoundPage from "./pages/NotFoundPage";
import Posts from "./pages/Posts";
import Tags from "./pages/Tags";
import Users from "./pages/Users";

export interface route {
  path: string;
  name: string;
  component: Function;
  layout?: Function;
}
const routes: route[] = [
  {
    path: "/",
    name: "dash board",
    component: Dashboard,
  },
  {
    path: "/dashboad",
    name: "dash board",
    component: Dashboard,
  },
  {
    path: "/tags",
    name: "tags",
    layout: Table,
    component: Tags,
  },
  {
    path: "/categories",
    name: "categories",
    layout: Table,
    component: Categories,
  },
  {
    path: "/posts",
    name: "posts",
    layout: Table,
    component: Posts,
  },
  {
    path: "/users",
    name: "users",
    layout: Table,
    component: Users,
  },
  {
    path: "/users/edit/:id",
    name: "users edit",
    component: EditUser,
  },
  {
    path: "/users/add",
    name: "users add",
    component: AddUser,
  },
];
export default routes;
