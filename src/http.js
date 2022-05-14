export class Http {
	static HEADERS = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	static async get(url, errorHandler = null, finallyCallback = null) {
		try {
			return await request(url);
		} catch (e) {
			if (errorHandler) errorHandler('Error fetching todos');
			console.log(e);
		} finally {
			if (finallyCallback) finallyCallback();
		}
	}

	static async post(url, data = {}, errorHandler = null) {
		try {
			return await request(url, 'POST', data);
		} catch (e) {
			if (errorHandler) errorHandler('Error adding new todo');
			console.log(e);
		}

	}

	static async delete(url, errorHandler = null) {
		try {
			return await request(url, 'DELETE');
		} catch (e) {
			if (errorHandler) errorHandler('Error deleting todo');
			console.log(e);
		}
	}


	static async patch(url, data = {}, errorHandler = null) {
		try {
			return await request(url, 'PATCH', data);
		} catch (e) {
			if (errorHandler) errorHandler('Error updating todo');
			console.log(e);
		}
	}
}

const request = async (url, method = 'GET', data) => {
	const config = {
		method,
		headers: Http.HEADERS
	};

	if (method === 'POST' || method === 'PATCH') {
		config.body = JSON.stringify(data);
	}
	const response = await fetch(url, config);
	if (!response.ok) throw new Error('Some error occurred');
	return await response.json();
};