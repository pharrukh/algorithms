#!/bin/bash

# Directory containing .MOV files
input_dir="$1"

# Check if directory is provided
if [ -z "$input_dir" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Iterate over all .MOV files in the directory
for mov_file in "$input_dir"/*-100.mov; do
  # Get the base name of the file without extension
  base_name=$(basename "$mov_file" .mov)
  # Convert .MOV to .GIF
  ffmpeg -i "$mov_file" -vf "fps=60,scale=1200:-1:flags=lanczos" "$input_dir/$base_name.gif"
done

echo "Conversion completed."
