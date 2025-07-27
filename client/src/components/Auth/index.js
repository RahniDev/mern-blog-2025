export const signup = user => {
    return fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .then(data => console.log(data))
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
          .then(data => {
            console.log('Signin response:', data); // Log the response data
            return data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        // Check if data is an object and properly stringified
        if (data && typeof data === 'object') {
            localStorage.setItem('jwt', JSON.stringify(data)); // Set the JWT in localStorage
        }
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch('http://localhost:8000/signout', {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    const jwt = localStorage.getItem('jwt');
    if (!jwt) return false; // If there's no 'jwt' in localStorage, return false

    try {
        return JSON.parse(jwt); // Try to parse the jwt
    } catch (err) {
        console.error('Error parsing JWT:', err);
        return false; // Return false if JSON parsing fails
    }
};

export const read = (userId, token) => {
    return fetch(`http://localhost:8000/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};