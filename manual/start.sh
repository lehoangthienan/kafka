#!/bin/bash

function to_upcase_first_char(){
    str=$1
    searchstring=$2
    result="$str"

    rest=${str#*$searchstring}
    idx=$(( ${#str} - ${#rest}))

    if [[ $idx -lt ${#str} || $idx == ${#str} ]];
    then
        pre_str=${str:0:$(( idx - ${#searchstring} ))}
        after_str=${str:idx+1}
        if [[ $idx -lt ${#str} ]];
        then
            low_str=$(echo "${str:$idx:1}" | tr "[:lower:]" "[:upper:]")
        fi
        result="${pre_str}${low_str}${after_str}"
    fi
    echo $result
}

function set_config(){
    file_path=$1
    key=$2
    val=$3
    
    if grep -E -q "^#?$key=" $file_path; 
    then
        sed -r -i "s@^#?$key=.*@$key=$val@g" "$file_path"
    else
        echo -e "\n$key=$val" >> "$file_path"
    fi
}

if [ ! -f "$PLATFORM_PATH/$CONFIG_PATH" ];
then
    touch "$PLATFORM_PATH/$CONFIG_PATH"
fi

for val in $(env)
do
    upcase_key=$(echo "$val" | cut -d= -f1)
    if [[ $upcase_key =~ ^"${PLATFORM}_" ]]; 
    then
        lower_key=$(echo "$upcase_key" | cut -d_ -f2- | tr "[:upper:]" "[:lower:]" | tr _ .)
        while [[ $lower_key =~ ".." ]];
        do
            lower_key=$(to_upcase_first_char $lower_key "..")
        done
        val="${!upcase_key}"
        set_config "$PLATFORM_PATH/$CONFIG_PATH" $lower_key $val
    fi
done

function start(){
    if [[ $PLATFORM = 'KAFKA' ]];
    then
        exec "$PLATFORM_PATH/$CMD_PATH" "$PLATFORM_PATH/$CONFIG_PATH"
    else
        exec "$PLATFORM_PATH/$CMD_PATH" "start-foreground" "$PLATFORM_PATH/$CONFIG_PATH"
    fi
}

start