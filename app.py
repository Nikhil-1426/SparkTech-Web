from flask import Flask, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/get-excel-file', methods=['GET'])
def get_excel_file():
    file_path = "C:/Users/Aditi/Downloads/final_dataset.xlsx"
    return send_file(file_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)