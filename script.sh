#!/bin/bash

lines=""
if [ "$1" == "--lines" ] || [ "$2" == "--lines" ] || [ "$3" == "--lines" ] || [ "$4" == "--lines" ] || [ "$5" == "--lines" ]
then
    lines=" lines"
fi
bytes=""
if [ "$1" == "--bytes" ] || [ "$2" == "--bytes" ] || [ "$3" == "--bytes" ] || [ "$4" == "--bytes" ] || [ "$5" == "--bytes" ]
then
    bytes=" bytes"
fi
time=""
if [ "$1" == "--time" ] || [ "$2" == "--time" ] || [ "$3" == "--time" ] || [ "$4" == "--time" ] || [ "$5" == "--time" ]
then
    time=" time"
fi
throughput=""
if [ "$1" == "--throughput" ] || [ "$2" == "--throughput" ] || [ "$3" == "--throughput" ] || [ "$4" == "--throughput" ] || [ "$5" == "--throughput" ]
then
    throughput=" throughput"
fi
streaming=FALSE
if [ "$1" == "--streaming" ] || [ "$2" == "--streaming" ] || [ "$3" == "--streaming" ] || [ "$4" == "--streaming" ] || [ "$5" == "--streaming" ]
then
    streaming=TRUE
fi

if [ "$streaming" == TRUE ]
then
    # the function read reads line by line but this is the best solution I found to make it work with tail -f
    while read data
    do
        echo $data | node stats.js | node logger.js$bytes$lines$time$throughput
    done
else
    data=`cat /dev/stdin`
    echo "$data" | node stats.js | node logger.js$bytes$lines$time$throughput
fi

#tail -f temp | ./script.sh --lines --bytes --time --throughput --streaming
#echo wefghjkl >> temp
#cat temp | ./script.sh --lines --bytes --time --throughput