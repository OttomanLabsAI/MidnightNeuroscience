import numpy as np
import pandas as pd
import random

import UniversalTools as uto  # Assuming this has the ScaleData function

# Receptor Density
def SetReceptorDensity(df, choice, scaled=False, scale_type='minmax', axis=0, multiply_and_round=True, zero_replacement=0.03333):
    """
    Modify receptor density values in a DataFrame and optionally scale them.

    This function takes a DataFrame with receptor density ranges in the format 'min:max',
    and transforms these values into a single number based on the given choice.
    The original DataFrame is not modified.

    If scaled is True, the function will scale the receptor density values using uto.ScaleData
    before returning the DataFrame.

    Parameters:
    ----------
    df : pandas.DataFrame
        A DataFrame containing receptor density columns in 'min:max' format or as single numbers.

    choice : str
        Specifies how the range should be transformed:
        - 'min'    : Replace the range with the minimum value.
        - 'max'    : Replace the range with the maximum value.
        - 'random' : Replace the range with a random value between min and max (inclusive).

    scaled : bool, optional (default=False)
        If True, scales the receptor density values using uto.ScaleData before returning.

    scale_type : str, optional (default='minmax')
        Specifies the type of scaling ('minmax' for MinMaxScaler or 'standard' for StandardScaler).

    axis : int, optional (default=0)
        Axis to scale along (0 for columns, 1 for rows).

    multiply_and_round : bool, optional (default=True)
        If True, multiplies scaled values by 100 and rounds to 2 decimal places.

    zero_replacement : float, optional (default=0.03333)
        A value to replace 0s in receptor density columns.

    Returns:
    -------
    pandas.DataFrame
        A copy of the DataFrame where the receptor density columns have been transformed
        to single values based on the given choice.
    """

    def convert_density(value, choice):
        """Helper function to extract min, max, or random value from 'min:max' or return the number if it's already a number."""
        if pd.isnull(value):
            return value  # Leave NaN values as is
        if isinstance(value, (int, float)):  # If value is already a number, return it
            return value
        if isinstance(value, str):
            if ':' in value:
                # Split the range into min and max if it's a string
                min_val, max_val = map(float, value.split(':'))
                if choice == 'min':
                    return min_val
                elif choice == 'max':
                    return max_val
                elif choice == 'random':
                    return random.uniform(min_val, max_val)
                else:
                    raise ValueError("Invalid choice: choose 'min', 'max', or 'random'")
            else:
                # Try to convert the string to a float
                return float(value)
        else:
            # Cannot interpret the value, return as is
            return value

    # Create a copy of the DataFrame to avoid modifying the original
    df_copy = df.copy()

    # Identify receptor density columns
    density_columns = [col for col in df.columns if 'Receptor Density' in col]

    # Apply the conversion function to the receptor density columns
    for col in density_columns:
        df_copy[col] = df_copy[col].apply(lambda x: convert_density(x, choice))

    # Replace any 0 values with the specified zero_replacement value (default: 0.03333)
    df_copy[density_columns] = df_copy[density_columns].replace(0, zero_replacement)

    # If scaled is True, apply uto.ScaleData to the receptor density columns
    if scaled:
        # Scale the density columns using the parameters passed in
        df_copy[density_columns] = uto.ScaleData(df_copy[density_columns], scale_type=scale_type, axis=axis, multiply_and_round=False)

    return df_copy
