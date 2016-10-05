#!/bin/bash
# manually transforms jsx into javascript using watch so that changing 
# the source file automatically generates the destination
babel --presets react src --watch --out-dir static
