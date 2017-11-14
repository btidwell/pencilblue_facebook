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
module.exports = function OauthServiceModule(pb) {

    class OauthService {
        constructor(context = {}) {
            this.site = context.site || '';
        }

        static init(cb) {
            cb(null, true);
        }

        static getName() {
            return 'oauthService';
        }

        getAccessToken(settings, cb) {
            let route = 'oauth/access_token';
            let params = {
                client_id: settings.app_id,
                client_secret: settings.app_secret,
                grant_type: 'client_credentials'
            };

            FB.api(route, params, (response) => {
                if (!response || response.error) {
                    let message = !response ? 'Did not get an response body while trying to get FB Access Token' : `FB Access Token failure: ${response.error}`;
                    pb.log.error(message);
                    response = {};
                }
                FB.setAccessToken(response.access_token || '');
                cb(response.access_token || '');
            });
        }
    }

    return OauthService;
};
