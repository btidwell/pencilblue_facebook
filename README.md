# pencilblue_facebook
Plugin for pulling Facebook posts in Pencilblue http://pencilblue.org

[![Code Climate](https://codeclimate.com/github/btidwell/pencilblue_facebook/badges/gpa.svg)](https://codeclimate.com/github/btidwell/pencilblue_facebook) [![Test Coverage](https://codeclimate.com/github/btidwell/pencilblue_facebook/badges/coverage.svg)](https://codeclimate.com/github/btidwell/pencilblue_facebook) [ ![Codeship Status for btidwell/pencilblue_facebook](https://codeship.com/projects/55f66030-c1f1-0132-0dca-3632ec7395c8/status?branch=master)](https://codeship.com/projects/73681)


Setup
-----
To use this plugin, you must first register as a developer on facebook here.  https://developers.facebook.com/
After registering you must also register your app (in this case your pencilblue installation).  

Once your app is registered you will find your App ID and App Secret under MyApps and selecting your appliction on the facebook developer page.  You will need to input these values in the plugin's settings page for API authentication.   

For now we only support the "posts" endpoint of the graph API.  After you declare a "facebook_page_id" to pull posts from you will then be able to access that APIs JSON response via the route "/action/facebook/posts".  

NOTE: The method for rendering the facebook content is up to the active template plugin.  (It is recommended to use Angular to asynchronously pull the facebook content via the $http service).  