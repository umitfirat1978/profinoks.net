from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, Query, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


# --- Static homepage data (mocked, non-persistent) ---
class SliderItem(BaseModel):
  id: int
  title: str
  image_url: str


class ProductGroup(BaseModel):
  id: int
  title: str
  slug: str
  image_url: str
  active_background_url: str
  href: str
  description: str


class ReferenceLogo(BaseModel):
  id: int
  image_url: str


class Testimonial(BaseModel):
  id: int
  hotel: str
  person: str
  role: str
  quote: str
  image_url: str
  detail_url: str


class HomePageData(BaseModel):
  slider: List[SliderItem]
  product_groups: List[ProductGroup]
  references: List[ReferenceLogo]
  testimonials: List[Testimonial]


class Product(BaseModel):
  id: Optional[str] = None
  sku: str
  name_en: str
  name_tr: str
  description_en: Optional[str] = None
  description_tr: Optional[str] = None
  group_slug: str
  image_url: Optional[str] = None
  is_active: bool = True


class ProductCreate(BaseModel):
  sku: str
  name_en: str
  name_tr: str
  description_en: Optional[str] = None
  description_tr: Optional[str] = None
  group_slug: str
  image_url: Optional[str] = None
  is_active: bool = True


class ProductUpdate(BaseModel):
  sku: Optional[str] = None
  name_en: Optional[str] = None
  name_tr: Optional[str] = None
  description_en: Optional[str] = None
  description_tr: Optional[str] = None
  group_slug: Optional[str] = None
  image_url: Optional[str] = None
  is_active: Optional[bool] = None


SLIDER_ITEMS: List[SliderItem] = [
  SliderItem(id=1, title="Since 1993", image_url="/ormel/slider-1.jpg"),
  SliderItem(id=2, title="Strong & Practical", image_url="/ormel/slider-2.jpg"),
  SliderItem(id=3, title="Aesthetics & Dynamic", image_url="/ormel/slider-3.png"),
  SliderItem(id=4, title="Functional & Modular", image_url="/ormel/slider-4.jpg"),
  SliderItem(id=5, title="The Best For Your Guest", image_url="/ormel/slider-5.png"),
  SliderItem(
    id=6,
    title="30 years of Production and Industry Experience",
    image_url="/ormel/slider-6.jpg",
  ),
]

PRODUCT_GROUPS: List[ProductGroup] = [
  ProductGroup(
    id=1,
    title="RESTAURANT EQUIPMENTS",
    slug="restaurant-equipments",
    image_url="/ormel/group-restaurant.png",
    active_background_url="/ormel/group-restaurant.png",
    href="https://profinoks.com.tr/en/products.aspx?id=1",
    description="Buffet and service solutions that combine durability with refined aesthetics.",
  ),
  ProductGroup(
    id=2,
    title="HOUSEKEEPING EQUIPMENTS",
    slug="housekeeping-equipments",
    image_url="/ormel/group-housekeeping.png",
    active_background_url="/ormel/group-housekeeping.png",
    href="https://profinoks.com.tr/en/products.aspx?id=2",
    description="Operationally functional trolleys and equipment for housekeeping teams.",
  ),
  ProductGroup(
    id=3,
    title="FRONT OFFICE EQUIPMENTS",
    slug="front-office-equipments",
    image_url="/ormel/group-frontoffice.png",
    active_background_url="/ormel/group-frontoffice.png",
    href="https://profinoks.com.tr/en/products.aspx?id=3",
    description="Elegant and functional solutions for lobby and reception areas.",
  ),
  ProductGroup(
    id=4,
    title="BANQUET & MEETING EQUIPMENTS",
    slug="banquet-meeting-equipments",
    image_url="/ormel/group-banquet.png",
    active_background_url="/ormel/group-banquet.png",
    href="https://profinoks.com.tr/en/products.aspx?id=4",
    description="Modular banquet and meeting equipment that adapts to every setup.",
  ),
]

REFERENCE_LOGOS: List[ReferenceLogo] = [
  ReferenceLogo(id=1, image_url="/ormel/ref-1.jpg"),
  ReferenceLogo(id=2, image_url="/ormel/ref-2.png"),
  ReferenceLogo(id=3, image_url="/ormel/ref-3.jpg"),
  ReferenceLogo(id=4, image_url="/ormel/ref-4.png"),
  ReferenceLogo(id=5, image_url="/ormel/ref-5.jpg"),
  ReferenceLogo(id=6, image_url="/ormel/ref-6.jpg"),
  ReferenceLogo(id=7, image_url="/ormel/ref-7.jpg"),
  ReferenceLogo(id=8, image_url="/ormel/ref-8.jpg"),
  ReferenceLogo(id=9, image_url="/ormel/ref-9.jpg"),
  ReferenceLogo(id=10, image_url="/ormel/ref-10.png"),
  ReferenceLogo(id=11, image_url="/ormel/ref-11.jpg"),
  ReferenceLogo(id=12, image_url="/ormel/ref-12.jpg"),
  ReferenceLogo(id=13, image_url="/ormel/ref-13.jpg"),
  ReferenceLogo(id=14, image_url="/ormel/ref-14.jpg"),
]

TESTIMONIALS: List[Testimonial] = [
  Testimonial(
    id=1,
    hotel="Mövenpick Hotel Istanbul",
    person="Oktay Çampınar",
    role="Purchasing Manager",
    quote=(
      "We met Profinoks in 2008 at CNR Istanbul Fair and placed our first "
      "housekeeping trolley orders that day. A modest, solution-oriented "
      "partner that has always made us feel they are by our side."
    ),
    image_url="/ormel/test-1.jpg",
    detail_url="https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=6",
  ),
  Testimonial(
    id=2,
    hotel="Radisson Blu Hotel, Istanbul Sisli / Pera",
    person="Melih İlgü",
    role="Purchasing Director",
    quote=(
      "With its ever-expanding product range and quality, Profinoks is one of "
      "the true pioneers in the HoReCa sector, especially with its strong "
      "after-sales support."
    ),
    image_url="/ormel/test-2.jpg",
    detail_url="https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=7",
  ),
  Testimonial(
    id=3,
    hotel="Fairmont Quasar Istanbul",
    person="Emre Melen",
    role="Assistant Director, Food & Beverage",
    quote=(
      "A company that changes our perspective on local products, "
      "surpassing imported quality and always providing tailored "
      "solutions with strong after-sales support."
    ),
    image_url="/ormel/test-3.jpg",
    detail_url="https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=4",
  ),
]


# --- Simple fake admin auth (no Google yet) ---
class AdminLoginRequest(BaseModel):
  password: str


class AdminSession(BaseModel):
  token: str
  role: str = "admin"


FAKE_ADMIN_TOKEN = "dev-admin-token"


# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --- Homepage API ---
@api_router.get("/home", response_model=HomePageData)
async def get_home_page_data() -> HomePageData:
  """Return static data for Profinoks home page clone.

  Data is kept in-memory and mirrors frontend mock.js content.
  """

  return HomePageData(
    slider=SLIDER_ITEMS,
    product_groups=PRODUCT_GROUPS,
    references=REFERENCE_LOGOS,
    testimonials=TESTIMONIALS,
  )


# --- Fake admin login & guard ---
@api_router.post("/admin/login", response_model=AdminSession)
async def fake_admin_login(payload: AdminLoginRequest):
  """Developer-only fake login.

  This is NOT secure and must be replaced by real OAuth before production.
  """

  if payload.password != "dev-admin":
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid developer password",
    )

  return AdminSession(token=FAKE_ADMIN_TOKEN)


async def require_fake_admin(admin_token: Optional[str] = Header(None, convert_underscores=False)):
  """Require static dev admin token from X-Admin-Token header."""

  if admin_token != FAKE_ADMIN_TOKEN:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Admin authentication required",
    )


# --- Product helpers & CRUD ---
def _serialize_product(doc: dict) -> Product:
  doc = doc.copy()
  doc["id"] = str(doc.pop("_id"))
  return Product(**doc)


@api_router.post("/admin/products", response_model=Product)
async def create_product(product: ProductCreate, _admin=Depends(require_fake_admin)):
  product_doc = product.model_dump()
  result = await db.products.insert_one(product_doc)
  product_doc["_id"] = result.inserted_id
  return _serialize_product(product_doc)


@api_router.get("/products", response_model=List[Product])
async def list_products(group_slug: Optional[str] = None):
  query: dict = {"is_active": True}
  if group_slug:
    query["group_slug"] = group_slug

  cursor = db.products.find(query)
  products: List[Product] = []
  async for doc in cursor:
    products.append(_serialize_product(doc))

  return products


@api_router.get("/admin/products", response_model=List[Product])
async def admin_list_products(_admin=Depends(require_fake_admin)):
  cursor = db.products.find()
  products: List[Product] = []
  async for doc in cursor:
    products.append(_serialize_product(doc))
  return products


@api_router.patch("/admin/products/{product_id}", response_model=Product)
async def update_product(product_id: str, update: ProductUpdate, _admin=Depends(require_fake_admin)):
  try:
    oid = ObjectId(product_id)
  except Exception:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid product id")

  update_doc = {k: v for k, v in update.model_dump().items() if v is not None}
  if not update_doc:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

  result = await db.products.find_one_and_update(
    {"_id": oid}, {"$set": update_doc}, return_document=True
  )
  if not result:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

  return _serialize_product(result)


@api_router.delete("/admin/products/{product_id}")
async def delete_product(product_id: str, _admin=Depends(require_fake_admin)):
  try:
    oid = ObjectId(product_id)
  except Exception:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid product id")

  result = await db.products.delete_one({"_id": oid})
  if result.deleted_count == 0:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
  return {"status": "deleted"}


# --- Existing status check demo models & routes ---
class StatusCheck(BaseModel):
  model_config = ConfigDict(extra="ignore")

  id: str = Field(default_factory=lambda: str(uuid.uuid4()))
  client_name: str
  timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
  client_name: str


@api_router.get("/")
async def root():
  return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
  status_dict = input.model_dump()
  status_obj = StatusCheck(**status_dict)
  await db.status_checks.insert_one(status_obj.model_dump())
  return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
  status_checks: List[StatusCheck] = []
  cursor = db.status_checks.find()
  async for doc in cursor:
    # Mongo _id is ignored thanks to model_config
    status_checks.append(StatusCheck(**doc))
  return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
  CORSMiddleware,
  allow_credentials=True,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
  level=logging.INFO,
  format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
  client.close()
