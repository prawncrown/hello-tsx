import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withRouter,RouteComponentProps,Link } from 'react-router-dom'

type BottomTabProps = RouteComponentProps<BottomTabParams> & {

}
type BottomTabParams={}
type BottomTabState = { route:string;};

class BottomTabs extends React.Component<BottomTabProps,BottomTabState>{

    constructor(props: BottomTabProps) {
        super(props);
        this.state = {
            route: '/'
        }     
        this.setRoute = this.setRoute.bind(this);
    }
    public setRoute = (route: string) => {
      this.setState({
          route: route
      })
      this.props.history.push(route)
   }
    render() {
        return (
            <BottomNavigation
              value={this.state.route}
              onChange={(event, newValue) => {
              this.setRoute(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Recents"  icon={<RestoreIcon />} component={Link} to={"/"}value="/" />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />}component={Link} to={"/fav"}value="/fav" />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} component={Link} to={"/neaby"} value="/neaby"/>
          </BottomNavigation>
          );
    }
}

export default withRouter(BottomTabs)

