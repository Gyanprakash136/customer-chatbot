# Customer Support Chatbot 🤖

A responsive and intelligent customer support chatbot built with Flask and JavaScript. This chatbot provides instant responses to common customer queries with a beautiful, modern interface.

![Chatbot Demo](https://img.shields.io/badge/Status-Working-brightgreen)
![Flask](https://img.shields.io/badge/Flask-2.3.3-blue)
![Python](https://img.shields.io/badge/Python-3.8+-blue)

## 🌟 Features

- **Real-time Chat Interface** - Instant messaging with smooth animations
- **Predefined Responses** - Handles common customer support queries
- **Quick Action Buttons** - One-click access to frequent questions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Character Counter** - Input validation and user guidance
- **Loading Indicators** - Visual feedback for better user experience
- **Optional AI Integration** - Supports OpenAI GPT integration
- **Professional UI** - Modern gradient design with smooth animations

## 🚀 Live Demo

Visit the live chatbot: [Customer Support Chatbot](https://github.com/Gyanprakash136/customer-chatbot)

## 📋 What the Chatbot Can Help With

- **Business Hours** - Operating hours and availability
- **Pricing Information** - Plans, costs, and billing details
- **Contact Details** - Phone, email, and support channels
- **Refund Policies** - Return and refund procedures
- **Shipping Information** - Delivery times and shipping options
- **Technical Support** - Basic troubleshooting assistance
- **Account Management** - Password resets and account issues

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Quick Start

1. **Clone the repository**
git clone https://github.com/Gyanprakash136/customer-chatbot.git
cd customer-chatbot

text

2. **Create virtual environment**
python -m venv .venv

Windows
.venv\Scripts\activate

Mac/Linux
source .venv/bin/activate

text

3. **Install dependencies**
pip install -r requirements.txt

text

4. **Set up environment variables (Optional)**
Create .env file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "SECRET_KEY=your_secret_key_here" >> .env

text

5. **Run the application**
python app.py

text

6. **Open your browser**
http://127.0.0.1:5000

text

## 📁 Project Structure

customer-chatbot/
├── app.py # Flask backend application
├── requirements.txt # Python dependencies
├── .env # Environment variables (optional)
├── README.md # Project documentation
├── templates/
│ └── index.html # Main chat interface
└── static/
├── css/
│ └── style.css # Responsive styling
└── js/
└── script.js # Frontend functionality

text

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

Optional: OpenAI API integration
OPENAI_API_KEY=your_openai_api_key_here

Flask secret key
SECRET_KEY=your_secret_key_here

text

### Customizing Responses

Edit the `PREDEFINED_RESPONSES` dictionary in `app.py` to customize chatbot responses:

PREDEFINED_RESPONSES = {
"hello": "Hello! Welcome to our customer support...",
"pricing": "Our basic plan starts at $29/month...",
# Add your custom responses here
}

text

## 🎨 Features in Detail

### 1. **Intelligent Response System**
- Predefined responses for common queries
- Keyword matching for accurate responses
- Fallback responses for unmatched queries
- Optional OpenAI integration for advanced AI responses

### 2. **Modern User Interface**
- Gradient background design
- Smooth animations and transitions
- Mobile-responsive layout
- Professional chat bubbles
- Loading indicators and notifications

### 3. **Quick Actions**
- Business Hours button
- Contact Information button
- Pricing Plans button
- Refund Policy button

### 4. **Input Validation**
- Character limit (500 characters)
- Real-time character counter
- Input sanitization
- Error handling and user feedback

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main chat interface |
| `/chat` | POST | Process chat messages |
| `/health` | GET | Application health check |

### Chat API Usage

// Send message to chatbot
fetch('/chat', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ message: 'Hello' })
})
.then(response => response.json())
.then(data => console.log(data.response));

text

## 🚀 Deployment

### Local Development
python app.py

text

### Production Deployment

#### Using Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app

text

#### Using Docker
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]

text

## 🧪 Testing

Test the chatbot with these sample queries:
- "What are your business hours?"
- "How much does it cost?"
- "How can I contact support?"
- "What's your refund policy?"
- "Hello"
- "I need help with my account"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gyan Prakash**
- GitHub: [@Gyanprakash136](https://github.com/Gyanprakash136)
- Repository: [customer-chatbot](https://github.com/Gyanprakash136/customer-chatbot)

## 🙏 Acknowledgments

- Flask framework for the backend
- Font Awesome for icons
- OpenAI for AI integration capabilities
- Modern CSS techniques for responsive design

## 📞 Support

If you have any questions or need help with the chatbot:
- Open an issue on GitHub
- Contact: gyan.official.work0902@gmail.com
- Documentation: Check this README

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ for customer support automation
