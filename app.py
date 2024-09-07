
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

# Load the model
model1 = joblib.load('house_price_model.pkl')
model2 = joblib.load('house_price_model1.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    size = data['size']
    bedrooms = data['bedrooms']
    prediction = model.predict([[size, bedrooms]])[0]
    return jsonify({'prediction': prediction})

@app.route('/graph', methods=['GET'])
def graph():
    # Serve the saved graph image
    return send_file('static/house_price_graph.png', mimetype='image/png')

@app.route('/analyze-graph', methods=['POST'])
def analyze_graph():
    try:
        # Path to the graph image
        graph_path = 'static/house_price_graph.png'
        print(f"Analyzing graph at: {graph_path}")

        graph_path2 = 'static/house_price_graph1.png'
        print(f"Analyzing graph at: {graph_path2}")

        # Open the image file using PIL
        img = Image.open(graph_path)
        img2 = Image.open(graph_path2)

        # Create a Gemini model instance for image analysis
        model = genai.GenerativeModel('gemini-1.5-pro')

        prompt=("Analyze the trends and relationships between the Y-axes of the two graphs provided. "
                  "Compare any correlations, differences, and notable patterns."
                  "Dont give any suggestions regarding the ML model and be positive about the analysis."
                  "Based on the temperature vs time graph display the peak temperature.")

        # Generate content based on the image
        response = model.generate_content([img, img2, prompt])
        analysis_result = response.text

        

        return jsonify({'analysis': analysis_result})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)