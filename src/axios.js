import axios from 'axios';

// library to fetch data.
// better way of fetch function
const instance = axios.create({
	baseURL: 'http://localhost:1035',
});

export default instance;
