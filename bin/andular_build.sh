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

ng build --prod
cd ..

output_dir=`date +%Y%m%d-%H%M`
mkdir $output_dir

cp -r dist/architectui-angular-pro $output_dir
zip -9r $output_dir.zip $output_dir


printf "build is copied to file %s in $PWD\n\n" $output_dir.zip


aws s3 cp $output_dir.zip s3://whiz-orders-angular-builds/

rm -rf $output_dir*
rm -rf dist


exit 0
