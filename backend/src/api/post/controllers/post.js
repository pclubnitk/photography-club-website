// @ts-nocheck
'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
    'api::post.post',
    ({ strapi }) => ({

        async getPhotos(ctx) {
            const posts = await strapi.entityService.findMany(
                'api::post.post',
                {
                    populate: {
                        images: true,
                        category: true,
                        photographerAvatar: true,
                    },
                }
            );

            const photos = posts.filter(
                (post) => post.images && post.images.length === 1
            );

            return { data: photos };
        },

        async getReels(ctx) {
            const posts = await strapi.entityService.findMany(
                'api::post.post',
                {
                    populate: {
                        images: true,
                        category: true,
                        photographerAvatar: true,
                    }
                }
            );

            const reels = posts.filter(
                (post) => post.images && post.images.length > 1
            );

            return { data: reels };
        },

        async likePost(ctx) {
            const { documentId } = ctx.params;

            if (!documentId) return ctx.badRequest("Missing documentId");

            const curr_post = await strapi.documents("api::post.post").findOne(
                {
                    documentId,

                    fields: ["likesCount"]
                }
            );

            if (!curr_post) return ctx.notFound("post not found");

            const updatePost = await strapi.documents("api::post.post").update({
                documentId,

                data: {
                    likesCount: (curr_post.likesCount || 0) + 1,
                },
            }
            );

            return { data: updatePost };
        },

    })
);
