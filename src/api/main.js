const url = "https://lfscards.herokuapp.com/merchants";
const cardsUrl = "https://lfscards.herokuapp.com/cards";

export const verifyMerchant = id => {
    return fetch(`${url}/id/${id}`)
        .then(res => res.json())
        .catch(err => err);
};

export const searchCard = id => {
    return fetch(`${cardsUrl}/${id}`)
        .then(res => res.json())
        .catch(err => err);
};
