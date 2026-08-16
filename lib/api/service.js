class BaseService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_URL;
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }

  async get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  async post(endpoint, body, headers = {}) {
    return this.request(endpoint, 'POST', body, headers);
  }

  async put(endpoint, body = null, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  async request(endpoint, method, body = null, extra_headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const isFormData = body instanceof FormData;
    const options = {
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...extra_headers,
      },
      method: method,
    };
    if (body !== null) {
      options.body = isFormData ? body : JSON.stringify(body);
    }


    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[BaseService][ERROR BODY]', errorText);
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.response = response;
        error.responseText = errorText;
        throw error;
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        return json;
      }
      return response.statusText;
    } catch (error) {
      console.error(`API call error with ${method} request from url ${url}`, error.message);
      throw error;
    }
  }
}

export default new BaseService();
