#!/bin/bash
cd /home/kavia/workspace/code-generation/virtual-garden-designer-223520-223535/virtual_garden_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

