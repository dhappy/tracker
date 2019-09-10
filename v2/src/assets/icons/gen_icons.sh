#!/bin/bash

sizes='72 96 128 144 152 192 384 512'

for size in $sizes; do
	dims="${size}x${size}"
    #convert golden_apple.svg -resize $dims "icon-$dims.png"
	inkscape -z -e "icon-$dims.png" -w $dim -h $dim golden_apple.svg
done
