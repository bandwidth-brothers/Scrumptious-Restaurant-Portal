import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import MenuList from '../components/MenuList'
import { RestaurantsStateContext } from '../pages/Admin'

describe('<AddRestaurant /> with no props', () => {

    jest.mock('../services/AuthService');

    afterEach(cleanup)

    it("should render initial layout", () => {
        const raw_data = require('./restaurant_data.json');
        const data = JSON.parse(JSON.stringify(raw_data));
        render(
            <RestaurantsStateContext.Provider value={[data, null]}>
                <MenuList />
            </RestaurantsStateContext.Provider>
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Discount')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();

    });

})