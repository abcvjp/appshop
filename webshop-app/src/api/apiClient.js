import axios from "axios"

// Set up default config for http requests
const API = axios.create({
	baseURL: process.env.REACT_APP_API_BASE,
	headers: {
		"content-type": "application/json",
		Authorization: localStorage.getItem("auth_token")
			? "Bearer " + localStorage.getItem("auth_token")
			: "",
	},
	responseType: 'json'
})

// Add a request interceptor
API.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		if (!config.headers.Authorization) {
			let token = window.localStorage.getItem("auth_token")
			token = token ? "Bearer " + token : ""
			config.headers.Authorization = token
		}
		return config
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error)
	}
)

export default API