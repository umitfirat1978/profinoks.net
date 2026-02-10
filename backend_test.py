#!/usr/bin/env python3
"""
Backend API Testing for Ormel Clone
Tests all FastAPI endpoints using the configured backend URL
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, List

# Load backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")
print("=" * 60)

def test_hello_world():
    """Test GET /api/ returns Hello World message"""
    print("\n1. Testing GET /api/ (Hello World)")
    print("-" * 40)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            
            expected = {"message": "Hello World"}
            if data == expected:
                print("✅ PASS: Hello World endpoint working correctly")
                return True
            else:
                print(f"❌ FAIL: Expected {expected}, got {data}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

def test_status_endpoints():
    """Test POST and GET /api/status endpoints with MongoDB"""
    print("\n2. Testing /api/status endpoints (MongoDB)")
    print("-" * 40)
    
    # Test POST /api/status
    print("Testing POST /api/status...")
    test_data = {
        "client_name": f"test_client_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    }
    
    try:
        response = requests.post(f"{API_BASE}/status", json=test_data, timeout=10)
        print(f"POST Status Code: {response.status_code}")
        
        if response.status_code == 200:
            created_status = response.json()
            print(f"Created Status: {json.dumps(created_status, indent=2)}")
            
            # Validate response structure
            required_fields = ['id', 'client_name', 'timestamp']
            if all(field in created_status for field in required_fields):
                print("✅ PASS: POST /api/status created status check successfully")
                post_success = True
            else:
                print(f"❌ FAIL: Missing required fields. Expected: {required_fields}")
                post_success = False
        else:
            print(f"❌ FAIL: POST expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            post_success = False
            
    except Exception as e:
        print(f"❌ ERROR in POST: {e}")
        post_success = False
    
    # Test GET /api/status
    print("\nTesting GET /api/status...")
    try:
        response = requests.get(f"{API_BASE}/status", timeout=10)
        print(f"GET Status Code: {response.status_code}")
        
        if response.status_code == 200:
            status_list = response.json()
            print(f"Retrieved {len(status_list)} status checks")
            
            if isinstance(status_list, list):
                if len(status_list) > 0:
                    print(f"Sample status check: {json.dumps(status_list[0], indent=2)}")
                print("✅ PASS: GET /api/status retrieved status checks successfully")
                get_success = True
            else:
                print("❌ FAIL: Expected list response")
                get_success = False
        else:
            print(f"❌ FAIL: GET expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            get_success = False
            
    except Exception as e:
        print(f"❌ ERROR in GET: {e}")
        get_success = False
    
    return post_success and get_success

def test_home_endpoint():
    """Test GET /api/home returns correct static JSON structure"""
    print("\n3. Testing GET /api/home (Static Ormel Data)")
    print("-" * 40)
    
    try:
        response = requests.get(f"{API_BASE}/home", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("Response structure:")
            print(f"- slider: {len(data.get('slider', []))} items")
            print(f"- product_groups: {len(data.get('product_groups', []))} items")
            print(f"- references: {len(data.get('references', []))} items")
            print(f"- testimonials: {len(data.get('testimonials', []))} items")
            
            # Validate required top-level keys (snake_case)
            required_keys = ['slider', 'product_groups', 'references', 'testimonials']
            missing_keys = [key for key in required_keys if key not in data]
            
            if missing_keys:
                print(f"❌ FAIL: Missing required keys: {missing_keys}")
                return False
            
            # Validate slider structure
            if data['slider'] and len(data['slider']) > 0:
                slider_item = data['slider'][0]
                slider_required = ['id', 'title', 'image_url']
                if all(key in slider_item for key in slider_required):
                    print(f"✅ Slider structure valid: {slider_item}")
                else:
                    print(f"❌ FAIL: Slider missing keys: {slider_required}")
                    return False
            
            # Validate product_groups structure
            if data['product_groups'] and len(data['product_groups']) > 0:
                product_item = data['product_groups'][0]
                product_required = ['id', 'title', 'slug', 'image_url', 'active_background_url', 'href', 'description']
                if all(key in product_item for key in product_required):
                    print(f"✅ Product groups structure valid")
                else:
                    print(f"❌ FAIL: Product groups missing keys: {product_required}")
                    return False
            
            # Validate references structure
            if data['references'] and len(data['references']) > 0:
                ref_item = data['references'][0]
                ref_required = ['id', 'image_url']
                if all(key in ref_item for key in ref_required):
                    print(f"✅ References structure valid")
                else:
                    print(f"❌ FAIL: References missing keys: {ref_required}")
                    return False
            
            # Validate testimonials structure
            if data['testimonials'] and len(data['testimonials']) > 0:
                test_item = data['testimonials'][0]
                test_required = ['id', 'hotel', 'person', 'role', 'quote', 'image_url', 'detail_url']
                if all(key in test_item for key in test_required):
                    print(f"✅ Testimonials structure valid")
                else:
                    print(f"❌ FAIL: Testimonials missing keys: {test_required}")
                    return False
            
            # Check for sample data
            expected_counts = {
                'slider': 6,
                'product_groups': 4,
                'references': 14,
                'testimonials': 3
            }
            
            for key, expected_count in expected_counts.items():
                actual_count = len(data.get(key, []))
                if actual_count >= expected_count:
                    print(f"✅ {key}: {actual_count} items (expected >= {expected_count})")
                else:
                    print(f"⚠️  {key}: {actual_count} items (expected >= {expected_count})")
            
            print("✅ PASS: GET /api/home returns correct structure with sample data")
            return True
            
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

def main():
    """Run all backend tests"""
    print("ORMEL CLONE BACKEND API TESTS")
    print("=" * 60)
    
    results = {
        'hello_world': test_hello_world(),
        'status_endpoints': test_status_endpoints(),
        'home_endpoint': test_home_endpoint()
    }
    
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return 0
    else:
        print("⚠️  Some backend tests FAILED!")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)