import { cleanup, render, screen } from '@testing-library/react'
import { shallow } from "enzyme"
import React from 'react'
import AddRestaurant from '../components/AddRestaurant'

describe('<AddRestaurant /> with no props', () => {

    jest.mock('../services/AuthService');
    const container = shallow(<AddRestaurant />);
    afterEach(cleanup)

    it("should render initial layout", () => {

        expect(container.getElements()).toMatchSnapshot();
    });

    it('render form elements', () => {
        render(<AddRestaurant />);
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