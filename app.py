from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

# Sample data
nb_data = {
    'classes': ['Important', 'Personal', 'Promotion', 'Spam', 'Work'],
    'precision': [0.94, 0.72, 0.95, 0.67, 0.70],
    'recall': [0.11, 0.89, 0.18, 0.48, 0.64],
    'f1': [0.19, 0.80, 0.30, 0.56, 0.67],
    'accuracy': 0.71,
    'macro_avg': 0.50,
    'weighted_avg': 0.69
}

svm_data = {
    'classes': ['Important', 'Personal', 'Promotion', 'Spam', 'Work'],
    'precision': [0.95, 0.95, 0.93, 0.95, 0.99],
    'recall': [0.82, 0.99, 0.82, 0.90, 0.96],
    'f1': [0.88, 0.97, 0.87, 0.93, 0.98],
    'accuracy': 0.96,
    'macro_avg': 0.93,
    'weighted_avg': 0.96
}

def predict_email(text, model_type):
    text = text.lower()
    patterns = {
        'Important': [r'urgent', r'important', r'priority'],
        'Promotion': [r'discount', r'offer', r'promo', r'sale'],
        'Work': [r'meeting', r'project', r'deadline'],
        'Spam': [r'free', r'win', r'prize'],
        'Personal': [r'hello', r'hi', r'dear']
    }
    
    scores = {}
    for category, regex_list in patterns.items():
        scores[category] = sum(1 for pattern in regex_list if re.search(pattern, text))
    
    if model_type == 'nb':
        if scores.get('Promotion', 0) > 1: return 'Promotion', 0.85
        elif scores.get('Work', 0) > 1: return 'Work', 0.80
        elif scores.get('Important', 0) > 0: return 'Important', 0.75
        elif scores.get('Spam', 0) > 1: return 'Spam', 0.70
        else: return 'Personal', 0.90
    else:
        if scores.get('Promotion', 0) > 0: return 'Promotion', 0.95
        elif scores.get('Work', 0) > 0: return 'Work', 0.93
        elif scores.get('Important', 0) > 0: return 'Important', 0.88
        elif scores.get('Spam', 0) > 0: return 'Spam', 0.85
        else: return 'Personal', 0.97

@app.route('/')
def index():
    return render_template('index.html', nb_data=nb_data, svm_data=svm_data)

@app.route('/classify', methods=['POST'])
def classify():
    email_text = request.form.get('email_text', '')
    if not email_text:
        return jsonify({'error': 'No email text provided'})
    
    nb_prediction, nb_confidence = predict_email(email_text, 'nb')
    svm_prediction, svm_confidence = predict_email(email_text, 'svm')
    
    return jsonify({
        'nb_prediction': nb_prediction,
        'nb_confidence': nb_confidence,
        'svm_prediction': svm_prediction,
        'svm_confidence': svm_confidence
    })

if __name__ == '__main__':
    app.run(debug=True)