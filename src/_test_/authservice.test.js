import axios from 'axios';
import AuthService from "../services/AuthService";

jest.mock('axios');

describe('fetchData', () => {


  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(AuthService.login('Lamm@test.com', "1223", false)).rejects.toThrow(errorMessage);

    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:8080/auth/login`, { "password": "1223", "username": "Lamm@test.com" }
    );
  });

});