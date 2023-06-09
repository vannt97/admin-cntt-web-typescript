import Table from "./layouts/Table/Table";
import AddCategory from "./pages/EditAddCategoryAndTag";
import AddUser from "./pages/AddUser";
import Login from "./pages/auth/Login";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import EditUser from "./pages/EditUser";
import NotFoundPage from "./pages/NotFoundPage";
import Posts from "./pages/Posts";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import EditAddCategoryAndTag from "./pages/EditAddCategoryAndTag";

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
  {
    path: "/category/add",
    name: "category add",
    component: EditAddCategoryAndTag,
  },
  {
    path: "/category/edit/:id",
    name: "category edit",
    component: EditAddCategoryAndTag,
  },
  {
    path: "/tag/add",
    name: "tag add",
    component: EditAddCategoryAndTag,
  },
  {
    path: "/tag/edit/:id",
    name: "tag edit",
    component: EditAddCategoryAndTag,
  },
];
export default routes;
