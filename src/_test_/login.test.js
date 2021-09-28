import { cleanup, render, screen } from '@testing-library/react'
import { shallow } from "enzyme"
import React from 'react'
import Login from '../components/Login'


describe('<Login /> with no props', () => {

    jest.mock('../services/AuthService');
    const container = shallow(<Login />);
    afterEach(cleanup)

    it("should render initial layout", () => {

        expect(container.getElements()).toMatchSnapshot();
    });

    it('render form elements', () => {
        render(<Login />);
        expect(screen.getByText('Email Address')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        // expect(screen.getByText('Remember me')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });


    it("should create an entry in component state with the event value", () => {

        container.find('#username').simulate('change', {
            target: {
                value: 'htest@test.com',
            },
        });
        expect(container.find('#username').prop('value')).toEqual('htest@test.com',);

        container.find('#password').simulate('change', {
            target: {
                value: '1234',
            },
        });
        expect(container.find('#password').prop('value')).toEqual('1234',);
    });

})










