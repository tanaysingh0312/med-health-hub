# File: main.py

# --- 1. Import Required Libraries ---
import os
import json
import csv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- 2. Initialize Flask App and Middleware ---
app = Flask(__name__)
CORS(app)

# --- 3. Database & API Key Configuration ---
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

try:
    client = MongoClient(MONGO_URI)
    db = client['med_health_hub']
    print("MongoDB connected successfully")
except Exception as e:
    print(f"MongoDB connection error: {e}")
    exit(1)

# --- 3a. Initial Data Population ---
def populate_initial_data():
    # Doctors
    if db.doctors.count_documents({}) == 0:
        doctors = [
            {"name": "Dr. A Kumar", "specialty": "Cardiology", "rating": 4.8, "location": "Delhi"},
            {"name": "Dr. B Sharma", "specialty": "Dermatology", "rating": 4.6, "location": "Mumbai"},
            {"name": "Dr. C Singh", "specialty": "Orthopedics", "rating": 4.7, "location": "Bangalore"}
        ]
        db.doctors.insert_many(doctors)
    # Specialties
    if db.specialties.count_documents({}) == 0:
        specialties = [
            {"name": "Cardiology"}, {"name": "Dermatology"}, {"name": "Orthopedics"},
            {"name": "Pediatrics"}, {"name": "ENT"}, {"name": "General Medicine"}
        ]
        db.specialties.insert_many(specialties)
    # Insurance
    if db.insurance.count_documents({}) == 0:
        try:
            with open(os.path.join(os.path.dirname(__file__), 'insurance.json'), encoding='utf-8') as f:
                insurance_data = json.load(f)
                db.insurance.insert_many(insurance_data)
        except Exception as e:
            print(f"Could not load insurance.json: {e}")
    # Hospitals
    if db.hospitals.count_documents({}) == 0:
        try:
            base_dir = os.path.dirname(__file__)
            db_dir = os.path.join(base_dir, 'database')
            hospitals_json_path = os.path.join(db_dir, 'hospitals.json')
            hospitals_csv_path = os.path.join(db_dir, 'hospitals.csv')

            hospitals_data = []
            if os.path.exists(hospitals_json_path):
                # Prefer JSON if present
                with open(hospitals_json_path, encoding='utf-8') as f:
                    data = json.load(f)
                    # Ensure list of dicts
                    if isinstance(data, list):
                        for item in data:
                            if not isinstance(item, dict):
                                continue
                            name = item.get('name') or item.get('DiagnosticCentreName') or ''
                            address = item.get('address') or item.get('DiagnosticCentreAddress') or ''
                            city = item.get('city') or item.get('CityName') or ''
                            doc = {
                                'name': name,
                                'address': address,
                                'city': city
                            }
                            hospitals_data.append(doc)
            elif os.path.exists(hospitals_csv_path):
                # Fallback to CSV
                with open(hospitals_csv_path, 'r', encoding='utf-8-sig', newline='') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        name = (row.get('DiagnosticCentreName') or '').strip()
                        address = (row.get('DiagnosticCentreAddress') or '').strip()
                        city = (row.get('CityName') or '').strip()
                        if not name and not address and not city:
                            continue
                        hospitals_data.append({
                            'name': name,
                            'address': address,
                            'city': city
                        })

            if hospitals_data:
                db.hospitals.insert_many(hospitals_data)
                print(f"Seeded hospitals collection with {len(hospitals_data)} records")
            else:
                print("No hospitals data found to seed (looked for database/hospitals.json or .csv)")
        except Exception as e:
            print(f"Could not load hospitals dataset: {e}")

populate_initial_data()

# --- 4. Define API Endpoints ---

# --- AUTH ---
# @route   POST /api/auth/register
# @desc    Register a new user
@app.route('/api/auth/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'patient')
    if not email or not password:
        return jsonify({'msg': 'Email and password are required'}), 400
    if db.users.find_one({'email': email}):
        return jsonify({'msg': 'User already exists'}), 400
    user_data = {
        'email': email,
        'password': password,  # For production, hash this!
        'role': role
    }
    db.users.insert_one(user_data)
    return jsonify({'msg': 'User registered successfully'}), 201


# @route   POST /api/auth/login
# @desc    Authenticate a user
@app.route('/api/auth/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = db.users.find_one({'email': email})
    if not user or user['password'] != password:
        return jsonify({'msg': 'Invalid credentials'}), 400
    return jsonify({'msg': 'User logged in', 'user': {'email': user['email'], 'role': user['role']}}), 200


# --- DOCTORS ---
# @route   GET /api/doctors
# @desc    Get all doctors
@app.route('/api/doctors', methods=['GET'])
def get_all_doctors():
    doctors = list(db.doctors.find({}, {'_id': 0}))
    return jsonify(doctors), 200


# @route   GET /api/doctors/<doctor_id>
# @desc    Get a single doctor by ID
@app.route('/api/doctors/<doctor_id>', methods=['GET'])
def get_doctor_by_id(doctor_id):
    doctor = db.doctors.find_one({'_id': doctor_id}, {'_id': 0})
    if not doctor:
        return jsonify({'msg': 'Doctor not found'}), 404
    return jsonify(doctor), 200


# --- APPOINTMENTS ---
# @route   POST /api/appointments
# @desc    Book a new appointment
@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    data = request.json
    user_id = data.get('userId')
    doctor_id = data.get('doctorId')
    date = data.get('date')
    time = data.get('time')
    if not all([user_id, doctor_id, date, time]):
        return jsonify({'msg': 'Missing appointment data'}), 400
    appointment_data = {
        'userId': user_id,
        'doctorId': doctor_id,
        'date': date,
        'time': time,
        'status': 'pending'
    }
    db.appointments.insert_one(appointment_data)
    return jsonify({'msg': 'Appointment booked successfully', 'appointment': appointment_data}), 201


# --- SPECIALTIES ---
# @route   GET /api/specialties
# @desc    Get all medical specialties
@app.route('/api/specialties', methods=['GET'])
def get_all_specialties():
    specialties = list(db.specialties.find({}, {'_id': 0}))
    return jsonify(specialties), 200


# @route   GET /api/hospitals
# @desc    Get all hospitals
@app.route('/api/hospitals', methods=['GET'])
def get_all_hospitals():
    """Retrieves all hospitals."""
    hospitals = list(db.hospitals.find({}, {'_id': 0}))
    return jsonify(hospitals), 200

# --- GOOGLE MAPS / HOSPITALS ---
# @route   GET /api/hospitals/nearby
# @desc    Find hospitals near a location using Google Maps Places API
@app.route('/api/hospitals/nearby', methods=['GET'])
def get_nearby_hospitals():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    radius = request.args.get('radius', 5000)  # meters
    if not all([lat, lon, GOOGLE_MAPS_API_KEY]):
        return jsonify({'msg': 'Missing latitude, longitude, or API key'}), 400
    try:
        url = (
            f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
            f"location={lat},{lon}&radius={radius}&type=hospital&key={GOOGLE_MAPS_API_KEY}"
        )
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        places = data.get('results', [])
        hospitals_data = [{
            'name': p['name'],
            'address': p.get('vicinity', 'Address not available'),
            'rating': p.get('rating'),
            'location': p['geometry']['location']
        } for p in places]
        return jsonify(hospitals_data), 200
    except requests.exceptions.RequestException as e:
        print(f"Google Maps API error: {e}")
        return jsonify({'msg': 'Failed to fetch data from Google Maps API', 'error': str(e)}), 500


# --- INSURANCE ---
# @route   GET /api/insurance
# @desc    Get all insurance schemes
@app.route('/api/insurance', methods=['GET'])
def get_all_insurance_schemes():
    insurance_schemes = list(db.insurance.find({}, {'_id': 0}))
    return jsonify(insurance_schemes), 200


# --- 5. Run the Server ---
if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=True)
