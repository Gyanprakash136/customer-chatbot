# app.py
import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Predefined responses for common customer queries
PREDEFINED_RESPONSES = {
    "hello": "Hello! Welcome to our customer support. How can I help you today?",
    "hi": "Hi there! I'm here to assist you. What can I do for you?",
    "hours": "Our business hours are Monday-Friday 9 AM to 6 PM EST.",
    "contact": "You can reach us at support@company.com or call (555) 123-4567.",
    "pricing": "Our basic plan starts at $29/month. Premium plan is $59/month. Enterprise pricing available on request.",
    "refund": "We offer a 30-day money-back guarantee. Please contact support@company.com for refund requests.",
    "shipping": "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.",
    "return": "Returns are accepted within 30 days of purchase. Items must be in original condition.",
    "support": "Our support team is available 24/7 via chat, email, or phone.",
    "account": "To manage your account, please log in to our website and visit the account settings page.",
    "password": "To reset your password, click 'Forgot Password' on the login page.",
    "cancel": "To cancel your subscription, please contact our support team or visit account settings.",
    "features": "Our platform includes real-time analytics, team collaboration, automated workflows, and 24/7 support.",
    "demo": "You can schedule a free demo at demo@company.com or book online through our website.",
    "trial": "We offer a 14-day free trial with full access to all features. No credit card required!",
    "bye": "Thank you for contacting us! Have a great day!",
    "thanks": "You're welcome! Is there anything else I can help you with?"
}


def get_ai_response(user_message):
    """Get response from OpenAI if API key is available"""
    if not openai.api_key or openai.api_key == "your_openai_api_key_here":
        return None

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system",
                 "content": "You are a helpful customer support assistant. Be friendly, professional, and concise. Help with general inquiries about products, services, billing, and support."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return None


def get_predefined_response(user_message):
    """Check for predefined responses based on keywords"""
    message_lower = user_message.lower()

    for keyword, response in PREDEFINED_RESPONSES.items():
        if keyword in message_lower:
            return response

    # Default responses for common patterns
    if any(word in message_lower for word in ["help", "assist", "support"]):
        return "I'm here to help! You can ask me about our hours, pricing, shipping, returns, or any other questions."

    if any(word in message_lower for word in ["problem", "issue", "error", "bug"]):
        return "I'm sorry to hear you're experiencing an issue. Can you please provide more details about the problem you're facing?"

    if any(word in message_lower for word in ["buy", "purchase", "order"]):
        return "Great! You can place an order through our website or contact our sales team at sales@company.com for assistance."

    return "I understand your question. For detailed assistance, please contact our support team at support@company.com or call (555) 123-4567."


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Try AI response first, fallback to predefined
        ai_response = get_ai_response(user_message)

        if ai_response:
            response = ai_response
            source = "AI"
        else:
            response = get_predefined_response(user_message)
            source = "Predefined"

        return jsonify({
            'response': response,
            'source': source,
            'success': True
        })

    except Exception as e:
        return jsonify({
            'error': 'Sorry, I encountered an error. Please try again.',
            'success': False
        }), 500


@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'Customer Support Chatbot is running!'})


if __name__ == '__main__':
    print("🤖 Starting Customer Support Chatbot...")
    print("📍 Open: http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)
