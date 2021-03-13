#!/bin/bash
#
# This script will perform a mongo dump of the local database and uploads the dump in to s3://mybus-mongo-dump-uploads.
# The dump will be placed in a subdirectory named after the current date and time.
#
# Usage:  ./mongo_backup.sh
#

set -ex

# to retain all backups, set this value to a non-positive integer
bucket=whiz-orders-angular-builds

build_name=`aws s3 ls s3://whiz-orders-angular-builds | tail -1 | awk '{print $4}'`
filename="${build_name%%.*}"
aws s3 cp s3://whiz-orders-angular-builds/$build_name .
unzip $build_name -d ~/temp
mv ~/temp/$filename/architectui-angular-pro  ~/whiz-orders-angular-build

rm -fR ~/temp

rm -fR build_name

sudo service nginx reload

exit 0
