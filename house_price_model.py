# import numpy as np
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# import joblib
# import matplotlib.pyplot as plt
# import os

# # Create the 'static' directory if it doesn't exist
# if not os.path.exists('static'):
#     os.makedirs('static')

# # Load your dataset
# data = pd.DataFrame({
#     'size': [1400, 1600, 1700, 1875, 1100, 1550, 2350, 2450, 1425, 1700],
#     'bedrooms': [3, 3, 3, 4, 2, 3, 4, 4, 3, 3],
#     'price': [245000, 312000, 279000, 308000, 199000, 219000, 405000, 324000, 319000, 255000]
# })

# # Feature matrix X and target variable y
# X = data[['size', 'bedrooms']]
# y = data['price']

# # Split the data
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Create and train the model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Save the model
# joblib.dump(model, 'house_price_model.pkl')

# # Create the graph
# fig, ax = plt.subplots()
# ax.scatter(data['size'], data['price'], color='blue', label='Price vs Size')
# ax.set_xlabel('Size (sq ft)')
# ax.set_ylabel('Price ($)')
# ax.set_title('House Prices')
# ax.legend()

# # Save the graph to a file
# plt.savefig('static/house_price_graph.png')
# plt.close(fig)


import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt
import joblib
import os

# Load the data
data = pd.read_excel(r"C:/Users/Aditi/Downloads/temperature1_data.xlsx", 
                     index_col='Date', 
                     parse_dates=['Date'])
data = data.values

# Scale the data
scaler = MinMaxScaler()
data = scaler.fit_transform(data)

# Split the data into training and testing sets
train_size = int(len(data) * 0.8)
train_data = data[0:train_size]
test_data = data[train_size:]

# Function to create the dataset
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        a = dataset[i:(i+time_step), 0]  # Only consider the 'Temperature' column
        dataX.append(a)
        dataY.append(dataset[i+time_step, 0])  # Only consider the 'Temperature' column
    return np.array(dataX), np.array(dataY)

# Create the training and testing datasets
time_step = 15
X_train, y_train = create_dataset(train_data, time_step)
X_test, y_test = create_dataset(test_data, time_step)

# Reshape the data
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

# Create the LSTM model
model = Sequential()
model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
model.add(LSTM(units=50, return_sequences=False))
model.add(Dense(1))

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit(X_train, y_train, batch_size=32, epochs=100)

# Save the model
joblib.dump(model, 'house_price_model.pkl')

# Make predictions
train_predict = model.predict(X_train)
test_predict = model.predict(X_test)

# Predict the temperature for the next 15 days
last_15_days = data[-15:, 0]  # Only consider the 'Temperature' column
last_15_days = last_15_days.reshape((1, last_15_days.shape[0], 1))
predicted_temperature = model.predict(last_15_days)
predicted_temperature = scaler.inverse_transform(predicted_temperature)

print('Predicted temperature for the next 15 days:', predicted_temperature)

# Ensure the 'static' directory exists
os.makedirs('static', exist_ok=True)

# Plot the data
plt.figure(figsize=(10,6))
plt.plot(np.arange(700, 716), scaler.inverse_transform(data[700:716, 0].reshape(-1, 1)), color='blue', label='Actual Temperature')
plt.plot(np.arange(715, 731), scaler.inverse_transform(test_predict[-16:, 0].reshape(-1, 1)), color='red', label='Predicted Temperature', linestyle='--')
plt.plot(np.arange(715, 731), scaler.inverse_transform(data[715:, 0].reshape(-1, 1)), color='green', label='Actual Recorded Data', linestyle='-')
plt.xlabel('Days')
plt.ylabel('Temperature (°C)')
plt.legend()

# Save the figure before showing it
plt.savefig('static/house_price_graph.png')

# Display the plot
plt.show()

