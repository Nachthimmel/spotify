export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  top_tracks: null,
  playing: false,
  track: null,
  token: {
    access_token: null,
    expires_in: null,
    refresh_token: null,
    token_type: null,
  },
  item: null,
  devices: [],
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing,
      };

    case 'SET_TRACK':
      return {
        ...state,
        item: action.item,
      };

    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    case 'SET_TOP_ARTISTS':
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case 'SET_TOP_TRACKS':
      return {
        ...state,
        top_tracks: action.top_tracks,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };

    case 'SET_SPOTIFY':
      return {
        ...state,
        spotify: action.spotify,
      };

    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };

    case 'SET_ITEM':
      return {
        ...state,
        item: action.item,
      };

    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices,
      };
    default:
      return state;
  }
};

export default reducer;
