#!/bin/bash

set -eu
# ensure grep output is only newline delimited
IFS=$'\n'

ta=('CS2100' 'CS2040S')
in=('doc' 'docx' 'ppt' 'pptx')
out=('pdf' 'pdf' 'pdf' 'pdf')
# cc='filepath'

cd ~/Documents/fluminurs
# extract filenames of the files downloaded
# fps=($(./fluminurs.linux --download-to=/home/jonchan51/Downloads/fluminus --updated=rename | grep -oP 'Downloaded to \K[^"]+'))
fps=($(grep -oP 'Downloaded to \K[^"]+' log))

if [[ -n ${fps[0]} ]]; then
  count=0
  for fp in ${fps[@]}; do
    for mod in ${ta[@]}; do
      if [[ $fp == *$ta* ]]; then
        # continue to next file
        continue 2
      fi
    done
    # convert


    # transfer
    
    echo $fp
    count=$((count + 1))
  done
  if [[ $count -gt 0 ]]; then
    xdg-open /home/jonchan51/Dropbox
  else
    echo 'Only TA stuff were downloaded'
  fi
else
  echo 'Nothing was downloaded'
fi
