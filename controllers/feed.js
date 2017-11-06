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

module.exports = function FeedControllerModule(pb) {

    class FeedController extends pb.BaseController {
        getPagePosts(cb) {
            const oauthService = new (pb.PluginService.getService('oauthService', 'pencilblue_facebook', this.site))({site: this.site});
            const postService = new (pb.PluginService.getService('postsService', 'pencilblue_facebook', this.site))({site: this.site});
            let pluginService = new pb.PluginService({site: this.site});
            pluginService.getSettingsKV('pencilblue_facebook', (err, settings) => {
                oauthService.getAccessToken(settings, (accessToken) => {
                    postService.getPagePosts(accessToken, settings, cb);
                });
            });
        }

        static getRoutes(cb) {
            cb(null, [
                {
                    method: 'get',
                    path: '/action/facebook/posts',
                    auth_required: false,
                    content_type: 'application/json',
                    handler: 'getPagePosts',
                    localization: true
                }
            ]);
        }
    }

    return FeedController;
};
