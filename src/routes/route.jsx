import Welcome from 'views/Welcome';
import Secured from 'views/Secured';
import Profile from 'views/Profile';
import AddLog from 'views/AddLog';
import History from 'views/History';

const appRoutes = [
  {path: "/welcome", name:"Welcome", component: Welcome},
  {path: "/profile", name: "Profile", component: Profile},
  {path: "/secured", name:"Secured", component: Secured},
  {path: "/addLog", name: "AddLog", component: AddLog},
  {path: "/history", name: "History", component: History}
]

export default appRoutes;
