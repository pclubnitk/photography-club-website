'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/posts/photos',
            handler: 'post.getPhotos',
            config: {
                policies: [],
                middlewares: [],
            },
            type: 'content-api',
        },
        {
            method: 'GET',
            path: '/posts/reels',
            handler: 'post.getReels',
            config: {
                policies: [],
                middlewares: [],
            },
            type: 'content-api',
        },
        {
            method: 'PUT',
            path: "/posts/:documentId/like",
            handler: "post.likePost",
            config: {
                policies: [],
                middlewares: [],
            },
            type: "content-api",
        }
    ],
};