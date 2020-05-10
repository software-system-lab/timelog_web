import Welcome from 'views/Welcome';
import Secured from 'views/Secured';

const appRoutes = [
  {public: true, path: "/welcome", name:"Welcome", component: Welcome},
  {path: "/secured", name:"Secured", component: Secured}
]

export default appRoutes;