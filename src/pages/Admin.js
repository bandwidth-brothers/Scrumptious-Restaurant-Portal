import React from 'react';
import Paperbase from '../theme/Paperbase'

export const RestaurantsStateContext = React.createContext();
export const ProfileStateContext = React.createContext();

function Admin(props) {

  const [restaurants, setRestaurants] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  return (
    <RestaurantsStateContext.Provider value={[restaurants, setRestaurants]}>
      <ProfileStateContext.Provider value={[profile, setProfile]}>
        <Paperbase />
      </ProfileStateContext.Provider>
    </RestaurantsStateContext.Provider>
  );
}

export default Admin;