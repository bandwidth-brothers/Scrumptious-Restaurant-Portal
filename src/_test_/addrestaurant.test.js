import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import { RestaurantsStateContext } from '../pages/Admin'

describe('<AddRestaurant /> with no props', () => {

    jest.mock('../services/AuthService');

    afterEach(cleanup)

    it("should render initial layout", () => {
        const raw_data = require('./restaurant_data.json');
        const data = JSON.parse(JSON.stringify(raw_data));
        render(
            <RestaurantsStateContext.Provider value={[data, null]}>
                <AddRestaurant />
            </RestaurantsStateContext.Provider>
        );

        expect(screen.getByText('Restaurant Name')).toBeInTheDocument();
        expect(screen.getByText('Address line 1')).toBeInTheDocument();
        expect(screen.getByText('Address line 2')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('State')).toBeInTheDocument();
        expect(screen.getByText('Zip code')).toBeInTheDocument();
        expect(screen.getByText('US')).toBeInTheDocument();
        expect(screen.getByText('ADD')).toBeInTheDocument();

    });



})