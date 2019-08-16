#!/bin/sh


# cd to the working directory
cd /opt/code/ || exit 1
# install angular v 7.0.6
npm install -g @angular/cli@7.0.6
# install all the npm packages necessary
npm install || exit 2
# serve the page
ng serve --aot --host 0.0.0.0
