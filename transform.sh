#!/bin/bash
# manually transforms jsx into javascript using watch so that changing 
# the source file automatically generates the destination file (javascript)
babel --presets react src --watch --out-dir static
