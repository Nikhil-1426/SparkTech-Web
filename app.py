# from flask import Flask, send_file
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # This will enable CORS for all routes

# @app.route('/get-excel-file', methods=['GET'])
# def get_excel_file():
#     file_path = "C:/Users/Nikhil/Nikhil Data/Coding/Projects/SIH' 24/final_dataset.xlsx"
#     return send_file(file_path, as_attachment=True)

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
import joblib
import google.generativeai as genai
import os
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the Gemini API with your API key
api_key = "AIzaSyAdGwGGhCx7vmy4trLZKEJftgQ2VZqIlbI"
genai.configure(api_key=api_key)

@app.route('/get-excel-file', methods=['GET'])
def get_excel_file():
    file_path = "C:/Users/Nikhil/Nikhil Data/Coding/Projects/SIH' 24/final_dataset.xlsx"
    return send_file(file_path, as_attachment=True)

@app.route('/analyze-graph', methods=['POST'])
def analyze_graph():
    try:
        # Path to the graph image

        graph_path0 = 'static/power_consumption.png'
        print(f"Analyzing graph at: {graph_path0}")

        graph_path1 = 'static/humidity.png'
        print(f"Analyzing graph at: {graph_path1}")

        graph_path2 = 'static/precipitation.png'
        print(f"Analyzing graph at: {graph_path2}")

        graph_path3 = 'static/temperature.png'
        print(f"Analyzing graph at: {graph_path3}")

        graph_path4 = 'static/windspeed.png'
        print(f"Analyzing graph at: {graph_path4}")

        # Open the image file using PIL
        img0 = Image.open(graph_path0)
        img1 = Image.open(graph_path1)
        img2 = Image.open(graph_path2)
        img3 = Image.open(graph_path3)
        img4 = Image.open(graph_path4)

        # Create a Gemini model instance for image analysis
        model = genai.GenerativeModel('gemini-1.5-pro')

        prompt=("Analyze the trends and relationships between the Y-axes of the graphs provided. "
                  "Compare any correlations, differences, and notable patterns."
                  "Dont give any suggestions regarding the ML model and be positive about the analysis."
                  "Based on the Power Consumed vs Time graph display the peak load.")

        # Generate content based on the image
        response = model.generate_content([img0, img1, img2, img3, img4, prompt])
        analysis_result = response.text


        return jsonify({'analysis': analysis_result})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)


