#!/bin/bash
#
#

set -ex

# to retain all backups, set this value to a non-positive integer
bucket=whiz-orders-angular-builds

build_location=whiz-orders-angular-build

#get the last uploaded zip filename
build_name=`aws s3 ls s3://$bucket | tail -1 | awk '{print $4}'`

#get the file name from .zip file
filename="${build_name%%.*}"

#copy the file from s3 bucket to local
aws s3 cp s3://$bucket/$build_name .

#unzip the file
unzip $build_name -d ~/temp

rm -fR ~/$build-location
#copy to the build location
mv ~/temp/$filename/architectui-angular-pro  ~/$build-location

rm -fR ~/temp

rm -fR build_name

sudo service nginx reload

echo 'Removing the old build'
build_to_remove=`aws s3 ls s3://$bucket | awk 'FNR <= 1' | awk '{print $4}'`
aws s3 rm s3://$bucket/$build_to_remove

exit 0
