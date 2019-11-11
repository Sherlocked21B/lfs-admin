import actionMaps from "../mappers";

const initialState = {
    cards: [],
    maxCount: null,
    page: 1
};

function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case actionMaps.ADD_CARDS:
            let reduced = [];
            if (state.cards.length === 0) reduced = action.payload;
            else {
                action.payload.forEach(el => {
                    const exists = state.cards.filter(
                        each => each._id === el._id
                    );
                    if (exists.length === 0) reduced.push(el);
                });
            }
            return Object.assign({}, state, {
                cards: [...state.cards, ...reduced]
            });

        case actionMaps.SET_CARD_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            });

        case actionMaps.REMOVE_CARD:
            return Object.assign({}, state, {
                cards: state.cards.filter(each => each._id !== action.payload)
            });

        case actionMaps.SET_CARDS_MAXCOUNT:
            return Object.assign({}, state, {
                maxCount: action.payload
            });

        default:
            return state;
    }
}

export default cardsReducer;
