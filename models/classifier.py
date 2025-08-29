import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
import joblib
import os

# Simple simulation of classification based on keywords
def predict_email(text, model_type):
    text = text.lower()
    
    # Define keyword patterns for each category
    patterns = {
        'Important': [r'urgent', r'important', r'priority', r'asap', r'action required'],
        'Promotion': [r'discount', r'offer', r'promo', r'sale', r'limited time', r'deal'],
        'Work': [r'meeting', r'project', r'deadline', r'report', r'presentation', r'team'],
        'Spam': [r'free', r'win', r'prize', r'lottery', r'congratulations', r'selected'],
        'Personal': [r'hello', r'hi', r'dear', r'thanks', r'family', r'friend']
    }
    
    # Calculate scores for each category
    scores = {}
    for category, regex_list in patterns.items():
        scores[category] = 0
        for pattern in regex_list:
            if re.search(pattern, text):
                scores[category] += 1
    
    # Different behavior based on model
    if model_type == 'nb':
        # Naive Bayes tends to classify more as Personal
        if scores['Promotion'] > 2:
            prediction = 'Promotion'
            confidence = min(0.7 + scores['Promotion'] * 0.1, 0.95)
        elif scores['Work'] > 2:
            prediction = 'Work'
            confidence = min(0.65 + scores['Work'] * 0.1, 0.9)
        elif scores['Important'] > 1:
            prediction = 'Important'
            confidence = min(0.6 + scores['Important'] * 0.15, 0.85)
        elif scores['Spam'] > 1:
            prediction = 'Spam'
            confidence = min(0.55 + scores['Spam'] * 0.1, 0.8)
        else:
            prediction = 'Personal'
            confidence = min(0.8 + scores['Personal'] * 0.05, 0.95)
    else:
        # SVM is more accurate
        if scores['Promotion'] > 1:
            prediction = 'Promotion'
            confidence = min(0.85 + scores['Promotion'] * 0.05, 0.98)
        elif scores['Work'] > 1:
            prediction = 'Work'
            confidence = min(0.9 + scores['Work'] * 0.04, 0.99)
        elif scores['Important'] > 0:
            prediction = 'Important'
            confidence = min(0.8 + scores['Important'] * 0.1, 0.95)
        elif scores['Spam'] > 1:
            prediction = 'Spam'
            confidence = min(0.75 + scores['Spam'] * 0.1, 0.92)
        else:
            prediction = 'Personal'
            confidence = min(0.88 + scores['Personal'] * 0.04, 0.97)
    
    return prediction, round(confidence, 2)