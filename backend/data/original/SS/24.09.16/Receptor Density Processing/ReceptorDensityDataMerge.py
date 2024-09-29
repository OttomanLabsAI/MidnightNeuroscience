import os
import pandas as pd
from functools import reduce

# Get all JSON files in the current directory that end with "receptor_density.json"
json_files = [file for file in os.listdir() if file.endswith("receptor_density.json")]

# Read each JSON file into a DataFrame and store them in a list
dfs = [pd.read_json(file) for file in json_files]

# Check if there are any DataFrames to merge
if dfs:
    # Merge all DataFrames on 'Brain Structure' column
    merged_df = reduce(lambda left, right: pd.merge(left, right, on='Brain Structure', how='inner'), dfs)
    
    # Construct the output path: two folders up
    output_dir = os.path.abspath(os.path.join(os.getcwd(), '../../'))
    output_file = os.path.join(output_dir, 'merged_data.json')
    
    # Save the merged DataFrame as JSON
    merged_df.to_json(output_file, orient='records', lines=True)
    
    print(f"Merged data has been saved to {output_file}")
else:
    print("No JSON files found to merge.")