#!/bin/bash
echo '============================'
echo 'Running nginx'
echo '============================'

chmod +x /wait-for-it.sh

/wait-for-it.sh dev-server:8080 --timeout=80 -- nginx -g 'daemon off;'