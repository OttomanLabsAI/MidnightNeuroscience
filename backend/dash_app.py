import pandas as pd
import plotly.graph_objects as go
import dash
from dash import dcc, html
from dash.dependencies import Input, Output

receptors = [
    'Acetylcholine',
    'Adrenergic',
    'Cannabinoid',
    'Dopamine',
    'GABA',
    'Glutamate',
    'Histamine',
    'Melatonin',
    'Muscarinic',
    'Neuropeptide',
    'Neuropeptide Y',
    'Noradrenaline',
    'Opioid',
    'Orexin',
    'Prostaglandin',
    'Serotonin',
    'Somatostatin'
]

app = dash.Dash(__name__)

# Layout of the app
app.layout = html.Div([
    html.H1("Receptor Density Across Brain Structures"),
    
    dcc.Dropdown(
        id='structure-dropdown',
        options=[{'label': structure, 'value': structure} for structure in receptors],
        value=receptors[0],  # Default value
        clearable=False,
    ),
    
    dcc.Graph(id='receptor-graph')  # Graph to display the filtered data
])

# Callback to update the graph based on the dropdown selection
@app.callback(
    Output('receptor-graph', 'figure'),
    [Input('structure-dropdown', 'value')]
)
def update_graph(selected_structure):
    # Filter the DataFrame using ReceptorFilter with the selected structure (receptor)
    filtered_df = ReceptorFilter(c, selected_structure)
    
    # Generate the figure using graph_index_columns with the filtered data
    fig = graph_index_columns(filtered_df, colors='large', barmode='group', chart_type='bar')
    
    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True, host='0.0.0.0', port=8052)