import { cleanup, render, screen } from '@testing-library/react'
import { shallow } from "enzyme"
import React from 'react'
import Register from '../components/Register'


describe('<Login /> with no props', () => {

    jest.mock('../services/AuthService');
    const container = shallow(<Register />);
    afterEach(cleanup)

    it("should render initial layout", () => {

        expect(container.getElements()).toMatchSnapshot();
    });

    it('render form elements', () => {
        render(<Register />);
        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('Last Name')).toBeInTheDocument();
        // expect(screen.getByText('Remember me')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });




})