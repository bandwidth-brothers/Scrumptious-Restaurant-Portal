import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import AddMenu from '../components/AddMenu'
import { RestaurantsStateContext } from '../pages/Admin'
// import raw_data from './restaurant_data.json'

describe('<AddRestaurant /> with no props', () => {

    jest.mock('../services/AuthService');
    afterEach(cleanup)

    it("should render initial layout", () => {
        const raw_data = require('./restaurant_data.json');
        const data = JSON.parse(JSON.stringify(raw_data));
        render(
            <RestaurantsStateContext.Provider value={[data, null]}>
                <AddMenu />
            </RestaurantsStateContext.Provider>
        );

        expect(screen.getByText("Please select your restaurant")).toBeInTheDocument();
        expect(screen.getByText("Menu Name")).toBeInTheDocument();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText("Avaiable")).toBeInTheDocument();
        expect(screen.getByText("ADD")).toBeInTheDocument();

    });


})