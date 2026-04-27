from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ortools.sat.python import cp_model

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "AI Allocation Engine is active"})

@app.route('/ai/allocate', methods=['POST'])
def allocate():
    data = request.json
    task = data.get('task', {})
    resources = data.get('resources', [])
    
    # Simple Ranking Logic
    # In a real scenario, we'd use cp_model for complex constraints
    scored_resources = []
    for res in resources:
        score = 0
        if res['type'] == task['required_type']:
            score += 0.5
        if task.get('required_location') == res.get('location'):
            score += 0.2
        # Mock skill match
        score += 0.3
        
        scored_resources.append({
            "resource_id": res['id'],
            "score": round(score, 2),
            "method": "RULE_BASED"
        })
    
    # Sort by score descending
    scored_resources.sort(key=lambda x: x['score'], reverse=True)
    
    return jsonify({
        "status": "success",
        "allocations": scored_resources[:3] # Return top 3 candidates
    })

@app.route('/ai/forecast', methods=['GET'])
def forecast():
    days = int(request.args.get('days', 7))
    # Mock forecast data
    return jsonify({
        "forecast": [
            {"date": f"2025-05-{i:02d}", "demand": 45 + (i * 2)} for i in range(1, days + 1)
        ]
    })

if __name__ == '__main__':
    app.run(port=8000, debug=True)
