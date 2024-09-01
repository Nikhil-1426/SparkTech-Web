import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
import matplotlib.pyplot as plt
import os

# Create the 'static' directory if it doesn't exist
if not os.path.exists('static'):
    os.makedirs('static')

# Load your dataset
data = pd.DataFrame({
    'size': [1400, 1600, 1700, 1875, 1100, 1550, 2350, 2450, 1425, 1700],
    'bedrooms': [3, 3, 3, 4, 2, 3, 4, 4, 3, 3],
    'price': [245000, 312000, 279000, 308000, 199000, 219000, 405000, 324000, 319000, 255000]
})

# Feature matrix X and target variable y
X = data[['size', 'bedrooms']]
y = data['price']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'house_price_model.pkl')

# Create the graph
fig, ax = plt.subplots()
ax.scatter(data['size'], data['price'], color='blue', label='Price vs Size')
ax.set_xlabel('Size (sq ft)')
ax.set_ylabel('Price ($)')
ax.set_title('House Prices')
ax.legend()

# Save the graph to a file
plt.savefig('static/house_price_graph.png')
plt.close(fig)