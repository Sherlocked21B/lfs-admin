const url = "https://lfscards.herokuapp.com/merchants";
const cardsUrl = "https://lfscards.herokuapp.com/cards";

export const updateMerchants = ({ id, token, body }) => {
  return fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => res.json())
    .catch(err => err);
};

export const createMerchant = ({ token, body }) => {
  return fetch(`${url}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => res.json())
    .catch(err => err);
};

export const deleteMerchant = ({ token, id }) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "X-Access-Token": token
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export const addPhotos = ({ id, token, body }) => {
  return fetch(`${url}/image/${id}`, {
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export const updatePhotos = ({ id, token, body }) => {
  return fetch(`${url}/image/${id}`, {
    method: "PUT",
    headers: {
      enctype: "multipart/form-data",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export const deletePhotos = ({ id, token, name }) => {
  return fetch(`${url}/image/${id}/${name}`, {
    method: "DELETE",
    headers: {
      "X-Access-Token": token
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export const verifyToken = token => {
  return fetch(`https://lfscards.herokuapp.com/admin/${token}`)
    .then(res => res.json())
    .catch(err => err);
};

export const fetchMerchants = page => {
  return fetch(`${url}/${page}`)
    .then(res => res.json())
    .catch(err => err);
};

export const getCards = (page, token) => {
  return fetch(`${cardsUrl}/all/${page}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    }
  })
    .then(res => res.json())
    .catch(err => err);
};

export const updateCard = (id, body, token) => {
  return fetch(`${cardsUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => res.json())
    .catch(err => err);
};

export const createCard = (body, token) => {
  return fetch(`${cardsUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    },
    body: body
  })
    .then(res => res.json())
    .catch(err => err);
};

export const deleteCard = (id, token) => {
  return fetch(`${cardsUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token
    }
  })
    .then(res => res.json())
    .catch(err => err);
};
