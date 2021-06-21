import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/postsConstants";

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { posts: action.payload };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE:
    case LIKE:
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        posts: state.posts.filter((post) => post._id === action.payload),
      };
    default:
      return state;
  }
};
