import Table from "./layouts/Table/Table";
import AddEditUser from "./pages/AddEditUser";
import Login from "./pages/auth/Login";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
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
    path: "/users/edit",
    name: "users edit",
    component: AddEditUser,
  },
  {
    path: "/users/add",
    name: "users add",
    component: AddEditUser,
  },
];
export default routes;
