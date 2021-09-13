import React from 'react';
import Paperbase from '../theme/Paperbase'

export const RestaurantsStateContext = React.createContext();

function Admin(props) {

  const [restaurants, setRestaurants] = React.useState(null);

  return (
    <RestaurantsStateContext.Provider value={[restaurants, setRestaurants]}>
      <Paperbase />
    </RestaurantsStateContext.Provider>
  );
}

export default Admin;