/*
 Copyright (C) 2015  Careerbuilder, LLC

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const FB = require('fb');
const Promise = require('bluebird')
FB.options({
    version: 'v2.11',
    Promise
})

const fbUrl = 'https://facebook.com/'

module.exports = function PostsServiceModule(pb){

    class PostsService {
        constructor(context = {}) {
            this.site = context.site || '';
        }
        static init(cb) {
            cb(null, true);
        }
        static getName () {
            return 'postsService';
        }

        getPagePosts(accessToken, settings, cb) {
            const page = `${settings.facebook_page_id}/`
            const posts = `${page}posts/`
            FB.api(posts, { access_token: accessToken }).then(({data: [post]}) => {
                const siteLink = `${fbUrl}${page}`
                post.url = `${fbUrl}${post.id}`
                return {
                    siteLink,
                    post
                }
            })
            .then(content => ({content}))
            .then(cb, cb)
        }
    }

  return PostsService;
};
