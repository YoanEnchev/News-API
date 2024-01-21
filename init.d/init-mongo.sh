#!/bin/bash
echo 'xxxxxxxxx_xxxxxxx____xxxxxxx____xxxxxx___xxxx';

set -eu
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF

    use '$MONGO_INITDB_DATABASE';
EOF