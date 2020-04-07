const BASE_URL = '/api/puppies';

export function getAll() {
    return fetch(BASE_URL)
    .then(res => res.json());
}

export function create(pup) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(pup)
    }).then(res => res.json());
}