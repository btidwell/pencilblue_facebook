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
            let route = `/v2.10/${settings.facebook_page_id}/posts`;
            FB.api(route, {'access_token': accessToken}, (response) => {
                response.siteLink = `https://facebook.com/${settings.facebook_page_id}`;
                cb({content: JSON.stringify(response)});
            });
        }
    }

  return PostsService;
};
