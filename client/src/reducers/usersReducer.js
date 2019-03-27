// import {} from '../constants/ActionTypes';

const initialState = {
    users: [
        {username: "Jerry", user_id: "1232323_sdas"},
        {username: "Mike", user_id: "134_s3434das"},
    ]
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        default:
            return state;
    }
}