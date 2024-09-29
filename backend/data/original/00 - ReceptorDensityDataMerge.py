import pandas as pd
import os
import glob
from functools import reduce

# Get a list of all CSV files ending with 'receptor_density.csv' in the current directory
csv_files = glob.glob('*receptor_density.csv')

# Initialize a list to hold DataFrames
dataframes = []

# List to keep track of files included in the merge
included_files = []

# Read each CSV file into a DataFrame
for file in csv_files:
    df = pd.read_csv(file)
    # Trim whitespace from column names
    df.columns = [col.strip() for col in df.columns]
    # Identify the column that corresponds to 'Brain structure'
    brain_structure_cols = [col for col in df.columns if col.strip().lower() == 'brain structure']
    if brain_structure_cols:
        # Rename the column to 'Brain structure' if necessary
        if brain_structure_cols[0] != 'Brain structure':
            df.rename(columns={brain_structure_cols[0]: 'Brain structure'}, inplace=True)
        dataframes.append(df)
        included_files.append(file)
    else:
        print(f"Warning: '{file}' does not contain a 'Brain structure' column. This file will be skipped.")

# Check if we have at least two DataFrames to merge
if len(dataframes) == 0:
    print("No DataFrames to merge. Please ensure CSV files contain a 'Brain structure' column.")
elif len(dataframes) == 1:
    print("Only one DataFrame found. Saving it as 'ReceptorDensity.csv' without merging.")
    # Define the output path one folder up
    output_path = os.path.join('..', 'ReceptorDensity.csv')
    # Export the single DataFrame to a CSV file
    dataframes[0].to_csv(output_path, index=False)
    print(f"Data from '{included_files[0]}' saved to {output_path}")
else:
    # Merge all DataFrames on the 'Brain structure' column
    merged_df = reduce(lambda left, right: pd.merge(left, right, on='Brain structure', how='outer'), dataframes)

    # Define the output path one folder up
    output_path = os.path.join('..', 'ReceptorDensity.csv')

    # Export the merged DataFrame to a CSV file
    merged_df.to_csv(output_path, index=False)

    print(f"Merged receptor density data saved to {output_path}")
    print(f"Included files: {included_files}")
