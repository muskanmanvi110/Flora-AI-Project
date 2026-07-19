"""
Run locally : uvicorn main:app --reload
Api : http://127.0.0.1:8000/
"""

import io
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import os
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
from langchain_core.output_parsers import PydanticOutputParser
from contextlib import asynccontextmanager

class FlowerInfo(BaseModel):
    appearance: str
    blooming_season: str
    care_tips: str
    interesting_fact: str
    how_to_grow_at_home: str


load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


MODEL_PATH = "flower_classifier.keras"  
IMAGE_SIZE = (224, 224)                
CLASS_NAMES = [
    "Daffodil",
    "Lavender",
    "Lily",
    "Marigold",
    "Orchid",
    "Rose",
    "Sunflower",
    "Tulip",
]


model = None 


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = tf.keras.models.load_model(MODEL_PATH)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(file_bytes: bytes) -> np.ndarray:
    try:
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image file.")

    image = image.resize(IMAGE_SIZE)
    array = tf.keras.utils.img_to_array(image)
    array = np.expand_dims(array, axis=0)  # shape: (1, 224, 224, 3)
    return array

def generate_explanation(flower_name: str):
    parser = PydanticOutputParser(pydantic_object=FlowerInfo)

    prompt = f"""
You are a flower expert.

Give information about the flower {flower_name}.

{parser.get_format_instructions()}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return parser.parse(response.text)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    file_bytes = await file.read()
    input_array = preprocess_image(file_bytes)

    predictions = model.predict(input_array, verbose=0)[0]  # shape: (NUM_CLASSES,)

    confidence_scores = {
        CLASS_NAMES[i]: round(float(predictions[i]), 4)
        for i in range(len(CLASS_NAMES))
    }

    predicted_index = int(np.argmax(predictions))

    return {
        "predicted_class": CLASS_NAMES[predicted_index],
        "confidence": round(float(predictions[predicted_index]), 4),
        "all_confidence_scores": confidence_scores,
    }


@app.post("/explain")
async def explain(flower_name: str):

    explanation = generate_explanation(flower_name)

    return {
        "flower_name": flower_name,
        "explanation": explanation
    }

