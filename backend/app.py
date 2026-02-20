from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["feedbackDB"]
collection = db["feedback"]

@app.route("/feedback", methods=["POST"])
def add_feedback():
    data = request.json
    collection.insert_one(data)
    return jsonify({"message": "Feedback saved successfully"})

@app.route("/feedback", methods=["GET"])
def get_feedback():
    feedback_list = list(collection.find({}, {"_id": 0}))
    return jsonify(feedback_list)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
