#!/bin/bash
lower=`echo $1 | tr '[:upper:]' '[:lower:]'`
path=../src/extensions/$lower
mkdir -p $path

touch $path/$1Extension.ts
sed -e "s/NEW_EXTENSION_LOWER/$lower/g" -e "s/NEW_EXTENSION/$1/g" ./snippets/extension/NewExtension.ts > $path/$1Extension.ts

touch $path/$lower\PluginFactory.ts
sed -e "s/NEW_EXTENSION_LOWER/$lower/g" -e "s/NEW_EXTENSION/$1/g" ./snippets/extension/newPluginFactory.ts > $path/$lower\PluginFactory.ts

touch $path/$lower\PluginKey.ts
sed -e "s/NEW_EXTENSION_LOWER/$lower/g" -e "s/NEW_EXTENSION/$1/g" ./snippets/extension/newPluginKey.ts > $path/$lower\PluginKey.ts

touch $path/index.ts
sed -e "s/NEW_EXTENSION_LOWER/$lower/g" -e "s/NEW_EXTENSION/$1/g" ./snippets/extension/index.ts > $path/index.ts

