import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt

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

# Make predictions
train_predict = model.predict(X_train)
test_predict = model.predict(X_test)

# Plot the data
plt.figure(figsize=(10,6))
plt.plot(scaler.inverse_transform(data)[:, 0], color='blue', label='Actual Temperature')
plt.plot(np.concatenate([np.full((time_step,), np.nan), scaler.inverse_transform(train_predict)[:, 0]]), color='red', label='Training Prediction')
plt.plot(np.concatenate([np.full((len(train_data)+time_step,), np.nan), scaler.inverse_transform(test_predict)[:, 0]]), color='green', label='Testing Prediction')
plt.xlabel('Days')
plt.ylabel('Temperature (°C)')
plt.legend()
plt.show()

# Predict the temperature for the next 15 days
last_15_days = data[-15:, 0]  # Only consider the 'Temperature' column
last_15_days = last_15_days.reshape((1, last_15_days.shape[0], 1))
predicted_temperature = model.predict(last_15_days)
predicted_temperature = scaler.inverse_transform(predicted_temperature)

print('Predicted temperature for the next 15 days:', predicted_temperature)

# plt.figure(figsize=(10,6))
# plt.plot(np.arange(700, 715), scaler.inverse_transform(data[700:715, 0].reshape(-1, 1)), color='blue', label='Actual Temperature')
# plt.plot(np.arange(715, 731), scaler.inverse_transform(test_predict[-16:, 0].reshape(-1, 1)), color='red', label='Predicted Temperature', linestyle='--')
# plt.plot(np.arange(715, 731), scaler.inverse_transform(data[715:, 0].reshape(-1, 1)), color='green', label='Actual Recorded Data', linestyle='-')
# plt.xlabel('Days')
# plt.ylabel('Temperature (°C)')
# plt.legend()
# plt.show()

plt.figure(figsize=(10,6))
plt.plot(np.arange(700, 716), scaler.inverse_transform(data[700:716, 0].reshape(-1, 1)), color='blue', label='Actual Temperature')
plt.plot(np.arange(715, 731), scaler.inverse_transform(test_predict[-16:, 0].reshape(-1, 1)), color='red', label='Predicted Temperature', linestyle='--')
plt.plot(np.arange(715, 731), scaler.inverse_transform(data[715:, 0].reshape(-1, 1)), color='green', label='Actual Recorded Data', linestyle='-')
plt.xlabel('Days')
plt.ylabel('Temperature (°C)')
plt.legend()
plt.show()