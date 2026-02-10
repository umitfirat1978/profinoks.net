# API & Data Contracts for Ormel Home Page Clone

## 1. Scope
Frontend currently uses mocked static data to render the English home page clone. Backend will expose the **same static data** via FastAPI so the frontend can consume it through REST APIs. No authentication or external integrations are required.

## 2. API Contracts
All routes are prefixed with `/api`.

### GET `/api/home`
**Purpose:** Provide all content needed for the home page in a single payload.

**Response 200 JSON:**
```json
{
  "slider": [
    { "id": 1, "title": "Since 1993", "image_url": "/ormel/slider-1.jpg" }
  ],
  "product_groups": [
    {
      "id": 1,
      "title": "RESTAURANT EQUIPMENTS",
      "slug": "restaurant-equipments",
      "image_url": "/ormel/group-restaurant.png",
      "active_background_url": "/ormel/group-restaurant.png",
      "href": "https://ormel.com.tr/en/products.aspx?id=1",
      "description": "Buffet and service solutions that combine durability with refined aesthetics."
    }
  ],
  "references": [
    { "id": 1, "image_url": "/ormel/ref-1.jpg" }
  ],
  "testimonials": [
    {
      "id": 1,
      "hotel": "Mövenpick Hotel Istanbul",
      "person": "Oktay Çampınar",
      "role": "Purchasing Manager",
      "quote": "…",
      "image_url": "/ormel/test-1.jpg",
      "detail_url": "https://ormel.com.tr/yorumdetay.aspx?dil=en&q=6"
    }
  ]
}
```

No request body or query parameters. Error responses use default FastAPI error format.

## 3. Mapping from `mock.js` to Backend
Data currently mocked in `frontend/src/mock.js` will be duplicated as in-memory constants in `backend/server.py`:
- `sliderItems` → `SLIDER_ITEMS` for `slider`
- `productGroups` → `PRODUCT_GROUPS` for `product_groups`
- `referenceLogos` → `REFERENCE_LOGOS` for `references`
- `testimonials` → `TESTIMONIALS` for `testimonials`

Image paths remain **relative public paths** (e.g. `/ormel/slider-1.jpg`), served by the frontend’s static assets.

## 4. Backend Implementation Plan
- Add Pydantic models for `SliderItem`, `ProductGroup`, `ReferenceLogo`, `Testimonial`, and `HomePageData`.
- Add static in-memory lists for each data type and a `GET /api/home` endpoint returning `HomePageData`.
- Keep existing status endpoints unchanged.

## 5. Frontend Integration Plan
- Introduce a small API client wrapper using `process.env.REACT_APP_BACKEND_URL` and prefix `/api`.
- Update `HomePage.jsx` to:
  - Use the existing mocked arrays from `mock.js` as **initial state** so the page renders immediately.
  - On mount, fetch `/api/home` and, if successful, replace state with backend data.
  - Adjust auto-rotation effects to depend on state lengths, not hardcoded arrays.
- `mock.js` remains as a frontend-only **fallback** and design reference; primary data source becomes the backend API.
