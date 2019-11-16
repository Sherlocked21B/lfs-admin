const url = "https://lfscards.herokuapp.com/merchants";
const visitsUrl = "https://lfscards.herokuapp.com/visits";

export const verifyMerchant = id => {
    return fetch(`${url}/id/${id}`)
        .then(res => res.json())
        .catch(err => err);
};

export const searchCard = id => {
    return fetch(`${visitsUrl}/search/${id}`)
        .then(res => res.json())
        .catch(err => err);
};

export const getVisit = (userId, merchantId) => {
    return fetch(`${visitsUrl}/user/${userId}/${merchantId}`)
        .then(res => res.json())
        .catch(err => err);
};

export const createVisit = body => {
    return fetch(visitsUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then(res => res.json())
        .catch(err => err);
};

export const updateVisit = body => {
    return fetch(visitsUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then(res => res.json())
        .catch(err => err);
};
