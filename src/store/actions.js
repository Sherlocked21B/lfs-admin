import actionMaps from "./mappers";

export function addToken(payload) {
    return Object.freeze({ type: actionMaps.ADD_TOKEN, payload });
}

export function setResult(payload) {
    return Object.freeze({ type: actionMaps.SET_RESULT, payload });
}

export function setVisits(payload) {
    return Object.freeze({ type: actionMaps.SET_VISITS, payload });
}

export function setMerchant(payload) {
    return Object.freeze({ type: actionMaps.SET_MERCHANT, payload });
}
