export function addToken(payload) {
  return Object.freeze({ type: "ADD_TOKEN", payload })
}

export function addMerchants(payload) {
  return Object.freeze({ type: "ADD_MERCHANTS", payload })
}

export function addMaxCount(payload) {
  return Object.freeze({ type: "SET_MAXCOUNT", payload })
}

export function setPage(payload) {
  return Object.freeze({ type: "SET_PAGE", payload })
}
