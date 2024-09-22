import numpy as np
import pandas as pd
import random
import sklearn
from sklearn.preprocessing import MinMaxScaler, StandardScaler

def ScaleData(df, scale_type='minmax', axis=0, multiply_and_round=True):
    """
    Scales the numerical columns or rows of a DataFrame.

    Parameters:
    - df (pd.DataFrame): The input DataFrame.
    - scale_type (str): Type of scaling to apply ('minmax' or 'standard'). Default is 'minmax'.
    - axis (int): Axis to scale along (0 for columns, 1 for rows). Default is 0.
    - multiply_and_round (bool): If True, multiplies scaled values by 100 and rounds to 2 decimal places. Default is True.

    Returns:
    - pd.DataFrame: A scaled copy of the original DataFrame.
    """
    # Create a copy of the DataFrame to avoid modifying the original
    scaled_df = df.copy()

    # Identify numerical columns (assuming non-numerical data is set as index or excluded)
    if axis == 0:
        numerical_cols = scaled_df.select_dtypes(include=['number']).columns
    elif axis == 1:
        numerical_cols = scaled_df.columns
    else:
        raise ValueError("axis must be 0 (columns) or 1 (rows)")

    # Select the appropriate scaler
    if scale_type == 'minmax':
        scaler = MinMaxScaler()
    elif scale_type == 'standard':
        scaler = StandardScaler()
    else:
        raise ValueError("scale_type must be 'minmax' or 'standard'")

    if axis == 0:
        # Fit and transform the numerical columns
        scaled_values = scaler.fit_transform(scaled_df[numerical_cols])
        scaled_df[numerical_cols] = scaled_values
    elif axis == 1:
        # Fit and transform the rows
        scaled_values = scaler.fit_transform(scaled_df[numerical_cols].T).T
        scaled_df[numerical_cols] = scaled_values

    # If multiply_and_round is True, multiply by 100 and round to 2 decimal places
    if multiply_and_round:
        scaled_df[numerical_cols] = (scaled_df[numerical_cols] * 100).round(2)

    return scaled_df