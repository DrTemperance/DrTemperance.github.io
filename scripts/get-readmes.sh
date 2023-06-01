#!/bin/bash

# this script will re-download project insctructions so that up-to-date instructions can be readily accessed
# to run this script, copy and paste the two following lines into your gitpod terminal (don't copy the '#' symbol)

# chmod +x scripts/get-readmes.sh
# ./scripts/get-readmes.sh

printf "\n"

if test -e project-instructions; then
    rm -rf project-instructions
fi

mkdir project-instructions

mkdir temp-projects
cd temp-projects

# Clone all FSD projects into projects directory
git clone https://github.com/operationspark/first-website-hs
git clone https://github.com/operationspark/portfolio-hs
git clone https://github.com/operationspark/circularity
git clone https://github.com/operationspark/platformer-neo platformer
git clone https://github.com/operationspark/bouncing-box

if ! test -e first-website-hs || ! test -e portfolio-hs || ! test -e platformer || ! test -e bouncing-box || ! test -e circularity; then
    printf "\nFAILURE: Some projects could not be accessed on GitHub. Please run the script again."
else
    # Copy READMEs for projects into project-instructions dir
    cp first-website-hs/README.md ../project-instructions/first-website.md
    cp portfolio-hs/README.md ../project-instructions/portfolio.md
    cp platformer/README.md ../project-instructions/platformer.md
    cp bouncing-box/README.md ../project-instructions/bouncing-box.md
    cp circularity/README.md ../project-instructions/circularity.md

    cd ..
fi

# delete the temp-projects folder
rm -rf temp-projects
