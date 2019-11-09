const url = "https://lfscards.herokuapp.com/merchants"

export const updateMerchants = ({ id, token, body }) => {
  return fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: body,
  })
    .then(res => res.json())
    .catch(err => err)
}

export const createMerchant = ({ token, body }) => {
  return fetch(`${url}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Access-Token": token,
    },
    body: body,
  })
    .then(res => res.json())
    .catch(err => err)
}

export const addPhotos = ({ id, token, body }) => {
  return fetch(`${url}/image/${id}`, {
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
      "X-Access-Token": token,
    },
    body: body,
  })
    .then(res => {
      return res.json()
    })
    .catch(err => err)
}

export const updatePhotos = ({ id, token, body }) => {
  return fetch(`${url}/image/${id}`, {
    method: "PUT",
    headers: {
      enctype: "multipart/form-data",
      "X-Access-Token": token,
    },
    body: body,
  })
    .then(res => {
      return res.json()
    })
    .catch(err => err)
}

export const verifyToken = token => {
  return fetch(`https://lfscards.herokuapp.com/admin/${token}`)
    .then(res => res.json())
    .catch(err => err)
}

export const fetchMerchants = page => {
  return fetch(`${url}/${page}`)
    .then(res => res.json())
    .catch(err => err)
}
