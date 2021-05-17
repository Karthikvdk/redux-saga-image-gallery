const key = '?client_id=TH8VOPow6l51UGm5qrX2KwO4TJhq6nJp9VWUblCWkL0';
const URL = `https://api.unsplash.com/photos/`;

const fetchImages = async page => {
    const response = await fetch(`${URL}${key}&per_page=3&page=${page}`);
    const data = await response.json();

    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

const fetchStats = async id => {
    const response = await fetch(`${URL}${id}/statistics${key}`);
    const data = await response.json();

    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export { fetchImages, fetchStats };