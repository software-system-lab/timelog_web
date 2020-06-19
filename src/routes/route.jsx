import Welcome from 'views/Welcome';
import Secured from 'views/Secured';
import Profile from 'views/Profile';
import History from 'views/History';
import Activity from 'views/Activity';

const appRoutes = [
  {path: "/welcome", name:"Welcome", component: Welcome},
  {path: "/profile", name: "Profile", component: Profile},
  {path: "/secured", name:"Secured", component: Secured},
  {path: "/history", name: "History", component: History},
  {path: "/activity", name: "Activity", component: Activity},
]

export default appRoutes;
