#!/bin/bash
path=../src/components/$1
lower=`echo $1 | tr '[:upper:]' '[:lower:]'`
mkdir -p $path

touch $path/$1.scss
sed -e "s/COMPONENT_NAME/$lower/g" ./snippets/Snippet.scss > $path/$1.scss


touch $path/$1.tsx
sed -e "s/COMPONENT_NAME/$1/g" -e "s/COMPONENT_LOWER/$lower/g" ./snippets/Snippet.tsx > $path/$1.tsx


touch $path/$1.stories.mdx
sed -e "s/COMPONENT_NAME/$1/g" ./snippets/Snippet.stories.mdx > $path/$1.stories.mdx

touch $path/$1.spec.tsx
sed -e "s/COMPONENT_NAME/$1/g" -e "s/COMPONENT_LOWER/$lower/g" ./snippets/Snippet.spec.tsx > $path/$1.spec.tsx

touch $path/index.ts
sed -e "s/COMPONENT_NAME/$1/g" ./snippets/index.ts > $path/index.ts