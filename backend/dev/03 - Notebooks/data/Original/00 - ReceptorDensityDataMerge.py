import os
import pandas as pd
import json

# Use the current working directory
directory = os.getcwd()

# Dictionary to store dataframes separately with filenames as keys
dataframes = {}

# Loop through files in the directory
for filename in os.listdir(directory):
    # Check if the file ends with "receptor_density.csv"
    if filename.endswith("receptor_density.csv"):
        # Read the CSV file into a dataframe without using any column as an index
        df = pd.read_csv(os.path.join(directory, filename), index_col=False)
        
        # Ensure the "Brain Structure" column exists
        if 'Brain Structure' in df.columns:
            dataframes[filename] = df
        else:
            print(f"Warning: 'Brain Structure' column not found in {filename}")

# Check if there are any dataframes to merge
if len(dataframes) > 0:
    # Start with the first dataframe
    combined_df = list(dataframes.values())[0]
    
    # Iteratively merge the remaining dataframes on 'Brain Structure'
    for df in list(dataframes.values())[1:]:
        combined_df = pd.merge(combined_df, df, on='Brain Structure', how='inner')
    
    # Dynamically get all columns from the combined DataFrame
    final_columns = combined_df.columns.tolist()

    # Convert the DataFrame to the desired JSON format
    result_json = combined_df.to_dict(orient='records')

    # Get the parent directory (one folder up)
    parent_directory = os.path.dirname(directory)

    # Define the full path to save the JSON file one folder up
    json_file_path = os.path.join(parent_directory, 'ReceptorDensity.json')

    # Save the result as a JSON file, overwriting if it exists
    with open(json_file_path, 'w') as json_file:
        json.dump(result_json, json_file, indent=4)
    
    print(f"ReceptorDensity.json has been successfully created at {json_file_path}.")
else:
    print("No dataframes were loaded with 'Brain Structure' column.")
