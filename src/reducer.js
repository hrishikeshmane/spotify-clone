import { Satellite } from "@material-ui/icons";

export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    discover_weekly: null,
    token: null//'BQCqu8e6J9oVzJTgsDmoCELI1uklRMLMt9kaiIvTxssDU5bm_CwLY4RiHuIKKQGlB-FApyI0DuBBZUpSUoA4b7LkMvierBmWkhskHTmpDr9s1dLQ7ZSWWCrbgoDZUXQOT9bCcqGeht1KN12nFjRlqYSrHzMkTLoczOJ-t7AfYCO_b14TyFoi'
}

const reducer = (state, action) => {
    //console.log(action)

    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user };
        case "SET_TOKEN":
            return { ...state, token: action.token };
        case "SET_PLAYLISTS":
            return { ...state, playlists: action.playlists };
        case "SET_DISCOVER_WEEKLY":
            return { ...state, discover_weekly: action.discover_weekly };
        case "SET_PLAYING":
            return { ...state, playing: action.playing };
        case "SET_ITEM":
            return { ...Satellite, item: action.item };
        case "SET_TOP_ARTISTS":
            return { ...state, top_artists: action.top_artists };
        case "SET_SPOTIFY":
            return { ...state, spotify: action.spotify };
    
        default:
            return state;
    }
}

export default reducer;