import Welcome from 'views/Welcome';
import Secured from 'views/Secured';
import Profile from 'views/Profile';

const appRoutes = [
  {public: true, path: "/welcome", name:"Welcome", component: Welcome},
  {path: "/profile", name: "Profile", component: Profile},
  {path: "/secured", name:"Secured", component: Secured}
]

export default appRoutes;