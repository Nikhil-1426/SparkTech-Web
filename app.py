
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
model = joblib.load('house_price_model.pkl')


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

        # Open the image file using PIL
        img = Image.open(graph_path)

        # Create a Gemini model instance for image analysis
        model = genai.GenerativeModel('gemini-1.5-pro')

        prompt="What are the key trends in this graph?"

        # Generate content based on the image
        response = model.generate_content([img,prompt])
        analysis_result = response.text

        return jsonify({'analysis': analysis_result})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)