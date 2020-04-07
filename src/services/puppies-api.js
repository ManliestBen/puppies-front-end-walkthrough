const BASE_URL = '/api/puppies';

export function getAll() {
    return fetch(BASE_URL)
    .then(res => res.json());
}