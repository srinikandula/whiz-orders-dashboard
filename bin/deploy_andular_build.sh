#!/bin/bash
#
#

set -ex

# to retain all backups, set this value to a non-positive integer
bucket=whiz-orders-angular-builds
#get the last uploaded zip filename
build_name=`aws s3 ls s3://whiz-orders-angular-builds | tail -1 | awk '{print $4}'`

#get the file name from .zip file
filename="${build_name%%.*}"

#copy the file from s3 bucket to local
aws s3 cp s3://whiz-orders-angular-builds/$build_name .

#unzip the file
unzip $build_name -d ~/temp

#copy to the build location
mv ~/temp/$filename/architectui-angular-pro  ~/whiz-orders-angular-build

rm -fR ~/temp

rm -fR build_name

sudo service nginx reload

exit 0
