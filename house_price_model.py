import pandas as pd
import numpy as np
import os
import joblib
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt

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

joblib.dump(model, 'house_price_model.pkl')

# Make predictions
train_predict = model.predict(X_train)
test_predict = model.predict(X_test)

# # Predict the temperature for the next 15 days
last_15_days = data[-15:, 0]  # Only consider the 'Temperature' column
last_15_days = last_15_days.reshape((1, last_15_days.shape[0], 1))
predicted_temperature = model.predict(last_15_days)
predicted_temperature = scaler.inverse_transform(predicted_temperature)

print('Predicted temperature for the next 15 days:', predicted_temperature)

os.makedirs('static', exist_ok=True)

plt.figure(figsize=(10,6))
plt.plot(np.arange(700, 716), scaler.inverse_transform(data[700:716, 0].reshape(-1, 1)), color='blue', label='Actual Temperature')
plt.plot(np.arange(715, 731), scaler.inverse_transform(test_predict[-16:, 0].reshape(-1, 1)), color='red', label='Predicted Temperature', linestyle='--')
plt.plot(np.arange(715, 731), scaler.inverse_transform(data[715:, 0].reshape(-1, 1)), color='green', label='Actual Recorded Data', linestyle='-')
plt.xlabel('Days')
plt.ylabel('Temperature (°C)')
plt.legend()

plt.savefig('static/house_price_graph.png')
plt.show()




# Load the humidity data
humidity_data = pd.read_excel(r"C:/Users/Aditi/Downloads/temperature1_data.xlsx", 
                             index_col='Date', 
                             parse_dates=['Date'])
humidity_data = humidity_data.values

# Scale the humidity data
humidity_scaler = MinMaxScaler()
humidity_data = humidity_scaler.fit_transform(humidity_data)

# Split the humidity data into training and testing sets
humidity_train_size = int(len(humidity_data) * 0.8)
humidity_train_data = humidity_data[0:humidity_train_size]
humidity_test_data = humidity_data[humidity_train_size:]

# Create the humidity training and testing datasets
humidity_X_train, humidity_y_train = create_dataset(humidity_train_data, time_step)
humidity_X_test, humidity_y_test = create_dataset(humidity_test_data, time_step)

# Reshape the humidity data
humidity_X_train = humidity_X_train.reshape(humidity_X_train.shape[0], humidity_X_train.shape[1], 1)
humidity_X_test = humidity_X_test.reshape(humidity_X_test.shape[0], humidity_X_test.shape[1], 1)

# Create the humidity LSTM model
humidity_model = Sequential()
humidity_model.add(LSTM(units=50, return_sequences=True, input_shape=(humidity_X_train.shape[1], 1)))
humidity_model.add(LSTM(units=50, return_sequences=False))
humidity_model.add(Dense(1))

# Compile the humidity model
humidity_model.compile(optimizer='adam', loss='mean_squared_error')

# Train the humidity model
humidity_model.fit(humidity_X_train, humidity_y_train, batch_size=32, epochs=100)

joblib.dump(model, 'house_price_model1.pkl')

# Make humidity predictions
humidity_train_predict = humidity_model.predict(humidity_X_train)
humidity_test_predict = humidity_model.predict(humidity_X_test)

# Predict the humidity for the next 15 days
humidity_last_15_days = humidity_data[-15:, 0]  # Only consider the 'Humidity' column
humidity_last_15_days = humidity_last_15_days.reshape((1, humidity_last_15_days.shape[0], 1))
humidity_predicted = humidity_model.predict(humidity_last_15_days)
humidity_predicted = humidity_scaler.inverse_transform(humidity_predicted)

print('Predicted humidity for the next 15 days:', humidity_predicted)

plt.figure(figsize=(10,6))
plt.plot(np.arange(700, 716), humidity_scaler.inverse_transform(humidity_data[700:716, 0].reshape(-1, 1)), color='blue', label='Actual Humidity')
plt.plot(np.arange(715, 731), humidity_scaler.inverse_transform(humidity_test_predict[-16:, 0].reshape(-1, 1)), color='red', label='Predicted Humidity', linestyle='--')
plt.plot(np.arange(715, 731), humidity_scaler.inverse_transform(humidity_data[715:, 0].reshape(-1, 1)), color='green', label='Actual Recorded Data', linestyle='-')
plt.xlabel('Days')
plt.ylabel('Humidity (%)')
plt.legend()

plt.savefig('static/house_price_graph1.png')
plt.show()