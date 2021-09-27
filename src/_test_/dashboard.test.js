import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Dashboard from '../components/Dashboard'
import { RestaurantsStateContext } from '../pages/Admin'

describe('<AddRestaurant /> with no props', () => {

    jest.mock('../services/AuthService');

    afterEach(cleanup)

    it("should render initial layout", () => {
        const raw_data = require('./restaurant_data.json');
        const data = JSON.parse(JSON.stringify(raw_data));
        render(
            <RestaurantsStateContext.Provider value={[data, null]}>
                <Dashboard />
            </RestaurantsStateContext.Provider>
        );

        expect(screen.getByText('IsActive')).toBeInTheDocument();
        expect(screen.getByText('Price_Category')).toBeInTheDocument();
        expect(screen.getByText('Rating')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();

    });

})