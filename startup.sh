#!/bin/bash

# start Go API
/usr/local/bin/blog-server &

# start nginx in foreground
nginx -g 'daemon off;'
