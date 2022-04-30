import { createSlice } from "@reduxjs/toolkit";

export interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    post: {
        _id: string;
        creator: string
    };
    user: {
        _id: string;
        picture: string;
        username: string;
    }
}


interface InitState {
    publicPosts: any[],
    userPosts: any[],
    post: any,
    comments: Comment[];
    [field: string]: any
}

const initialState: InitState = {
    publicPosts: [],
    userPosts: [],
    post: null,
    comments: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPublicPosts: (state, action) => {
            state.publicPosts = action.payload
        },

        getComments: (state, action) => {
            state.comments = action.payload;
        },

        addComment: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.post) {
                    return { ...post, comments: post.comments + 1 }
                }
                return post;
            })
            state.userPosts = state.userPosts.map((post) => {
                if (post._id === action.payload.post) {
                    return { ...post, comments: post.comments + 1 }
                }
                return post;
            })
            state.comments = [action.payload, ...state.comments];
        },

        deleteComment: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.postID) {
                    return { ...post, comments: post.comments - 1 }
                }
                return post;
            })
            state.userPosts = state.userPosts.map((post) => {
                if (post._id === action.payload.postID) {
                    return { ...post, comments: post.comments - 1 }
                }
                return post;
            })
            state.comments = state.comments.filter((comment) => comment._id !== action.payload.commentID);
        },

        // its action in the userActions and not postActions because i want to fetch data of user and then his posts
        getUserPosts: (state, action) => {
            state.userPosts = action.payload         
        },
        getPost: (state, action) => {
            state.post = action.payload
        },
        likePost: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.postId) {
                    return { 
                        ...post, 
                        likes: [...post.likes, action.payload.userId], 
                        dislikes: post.dislikes.includes(action.payload.userId) ? post.dislikes.filter((userId: string) => userId !== action.payload.userId) : post.dislikes
                    }
                }
                return post
            })

            if (state.userPosts.length > 0) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === action.payload.postId) {
                        return { 
                            ...post, 
                            likes: [...post.likes, action.payload.userId],
                            dislikes: post.dislikes.includes(action.payload.userId) ? post.dislikes.filter((userId: string) => userId !== action.payload.userId) : post.dislikes
                        }
                    }
                    return post
                })
            }
            if (state.post && (state.post?._id === action.payload.postId)) {
                state.post = { 
                    ...state.post, 
                    likes: [...state.post.likes, action.payload.userId],
                    dislikes: state.post.dislikes.includes(action.payload.userId) ? state.post.dislikes.filter((userId: string) => userId !== action.payload.userId) : state.post.dislikes
                }
            }

        },
        unlikePost: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.postId) {
                    return { 
                        ...post, 
                        likes: post.likes.filter((userId: string) => userId !== action.payload.userId),
                    }
                }
                return post
            })

            if (state.userPosts.length > 0) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === action.payload.postId) {
                        return { 
                            ...post, 
                            likes: post.likes.filter((userId: string) => userId !== action.payload.userId),
                        }
                    }
                    return post
                })
            }
            if (state.post && (state.post?._id === action.payload.postId)) {
                state.post = { 
                    ...state.post, 
                    likes: state.post.likes.filter((userId: string) => userId !== action.payload.userId),
                }
            }
        },
        dislikePost: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.postId) {
                    return { 
                        ...post, 
                        dislikes: [...post.dislikes, action.payload.userId], 
                        likes: post.likes.includes(action.payload.userId) ? post.likes.filter((userId: string) => userId !== action.payload.userId) : post.likes
                    }
                }
                return post
            })

            if (state.userPosts.length > 0) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === action.payload.postId) {
                        return { 
                            ...post, 
                            dislikes: [...post.dislikes, action.payload.userId],
                            likes: post.likes.includes(action.payload.userId) ? post.likes.filter((userId: string) => userId !== action.payload.userId) : post.likes
                        }
                    }
                    return post
                })
            }
            if (state.post && (state.post?._id === action.payload.postId)) {
                state.post = { 
                    ...state.post, 
                    dislikes: [...state.post.dislikes, action.payload.userId],
                    likes: state.post.likes.includes(action.payload.userId) ? state.post.likes.filter((userId: string) => userId !== action.payload.userId) : state.post.likes
                }
            }

        },
        undislikePost: (state, action) => {
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === action.payload.postId) {
                    return { 
                        ...post, 
                        dislikes: post.dislikes.filter((userId: string) => userId !== action.payload.userId),
                    }
                }
                return post
            })

            if (state.userPosts.length > 0) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === action.payload.postId) {
                        return { 
                            ...post, 
                            dislikes: post.dislikes.filter((userId: string) => userId !== action.payload.userId),
                        }
                    }
                    return post
                })
            }
            if (state.post && (state.post?._id === action.payload.postId)) {
                state.post = { 
                    ...state.post, 
                    dislikes: state.post.dislikes.filter((userId: string) => userId !== action.payload.userId),
                }
            }
        },
        createPost: (state, action) => {
            state.publicPosts = [action.payload.post, ...state.publicPosts]
            /*
                state.userPosts depends on the profile screen, it can be your profile and it can not be depending on the route params
                if it is your profile i'll add the post to state.userPosts
                example: you're creating the post from your profile screen
            */
            if (action.payload.isUser) {
                state.userPosts = [action.payload.post, ...state.userPosts]
            }

        },
        deletePost: (state, action) => {
            const { isInProfileScreen, isInPostScreen, postId } = action.payload;
            state.publicPosts = state.publicPosts.filter((post) => post._id !== postId);
            if (isInProfileScreen) {
                state.userPosts = state.userPosts.filter((post) => post._id !== postId);
            }
            if (isInPostScreen) {
                state.post = state.post._id === postId ? null : state.post;
            }
        },
        updatePost: (state, action) => {
            const { isInProfileScreen, postId, newContent } = action.payload;
            state.publicPosts = state.publicPosts.map((post) => {
                if (post._id === postId) {
                    return { ...post, content: newContent }
                }
                return post;
            })
            if (isInProfileScreen) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === postId) {
                        return { ...post, content: newContent }
                    }
                    return post
                })
            }
        }
    }
})

export const actions = postSlice.actions
export const postReducer = postSlice.reducer