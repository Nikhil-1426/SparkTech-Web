import pandas as pd
import numpy as np
import os
import joblib
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt

# Load data
def load_data(file_path):
    try:
        data = pd.read_excel(file_path, index_col='Date', parse_dates=['Date'])
        if not isinstance(data.index, pd.DatetimeIndex):
            # Attempt to convert index to datetime
            data.index = pd.to_datetime(data.index, errors='coerce')
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        raise

data = load_data(r"C:/Users/Aditi/Downloads/final_dataset.xlsx")

# Print column names to debug
print("Columns in the dataset:", data.columns.tolist())

# List of district columns for power consumption
district_columns = [
    'Power Consumed (Central Delhi)', 'Power Consumed (East Delhi)', 'Power Consumed (New Delhi)',
    'Power Consumed (North Delhi)', 'Power Consumed (North East Delhi)', 'Power Consumed (North West Delhi)',
    'Power Consumed (Shahadara)', 'Power Consumed (South Delhi)', 'Power Consumed (South East Delhi)',
    'Power Consumed (South West Delhi)', 'Power Consumed (West Delhi)'
]

# Ensure the columns exist in the DataFrame
for district in district_columns:
    if district not in data.columns:
        print(f"Warning: {district} not found in dataset columns")

# Directory to save models and plots
os.makedirs('static', exist_ok=True)

# Create a dictionary to hold scalers and models for each district's power data
scalers = {}
models = {}

# Function to create the dataset
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset) - time_step - 1):
        a = dataset[i:(i + time_step), 0]  # Only consider the 'Power Consumed' column
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])  # Only consider the 'Power Consumed' column
    return np.array(dataX), np.array(dataY)


# Function to aggregate data
def aggregate_data(df, freq):
    return df.resample(freq).sum()

# Process data for each district
for district in district_columns:
    print(f"Processing {district}...")

    if district not in data.columns:
        print(f"Skipping {district} due to missing column")
        continue
    
    # Extract relevant column
    power_data = data[[district]]
    
    # Aggregate data for different time ranges
    weekly_data = aggregate_data(power_data, 'W')
    monthly_data = aggregate_data(power_data, 'M')
    yearly_data = aggregate_data(power_data, 'Y')
    
    for period, period_data in zip(['week', 'month', 'year'], [weekly_data, monthly_data, yearly_data]):
        # Scale the data
        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(period_data)
        scalers[f'{district}_{period}'] = scaler
        
        # Split the data into training and testing sets
        train_size = int(len(scaled_data) * 0.8)
        train_data = scaled_data[:train_size]
        test_data = scaled_data[train_size:]
        
        # Create the training and testing datasets
        time_step = 15
        X_train, y_train = create_dataset(train_data, time_step)
        X_test, y_test = create_dataset(test_data, time_step)
        
        # Ensure the shapes are as expected
        print("Shape of X_train before reshaping:", X_train.shape)
        print("Shape of X_test before reshaping:", X_test.shape)

# Check if X_train and X_test are non-empty
        if X_train.ndim == 2:
          X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
        if X_test.ndim == 2:
          X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

# Print shapes after reshaping
        print("Shape of X_train after reshaping:", X_train.shape)
        print("Shape of X_test after reshaping:", X_test.shape)

        
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
        model_file = f'static/{district.replace(" ", "_")}_{period}_model.pkl'
        joblib.dump(model, model_file)
        models[f'{district}_{period}'] = model
        
        # Make predictions
        train_predict = model.predict(X_train)
        test_predict = model.predict(X_test)
        
        # Predict the power consumption for the next period
        last_period_data = scaled_data[-time_step:, 0]
        last_period_data = last_period_data.reshape((1, last_period_data.shape[0], 1))
        predicted_power = model.predict(last_period_data)
        predicted_power = scaler.inverse_transform(predicted_power)
        
        print(f'Predicted power consumption for the next period for {district} ({period}):', predicted_power)
        
        # Plot the results
        plt.figure(figsize=(12, 6))
        plt.plot(np.arange(len(scaled_data)), scaler.inverse_transform(scaled_data), color='blue', label='Actual Power Consumed')
        plt.plot(np.arange(len(scaled_data) - len(test_predict), len(scaled_data)), scaler.inverse_transform(test_predict), color='red', label='Predicted Power Consumed', linestyle='--')
        plt.xlabel(f'{period.capitalize()}s')
        plt.ylabel('Power Consumed (1000 MW)')
        plt.title(f'Power Consumption Forecast - {district} ({period.capitalize()})')
        plt.legend()
        
        # Save the plot
        plot_file = f'static/{district.replace(" ", "_")}_{period}_power_graph.png'
        plt.savefig(plot_file)
        plt.close()

print("Model training and graph generation complete.")
