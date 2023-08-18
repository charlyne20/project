from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import os

app = FastAPI()
# Allows the client to access the server
origins = ["http://localhost:5173", "http://127.0.0.1/5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the model
model = tf.keras.models.load_model("Resnet_BCDetection.h5")
img_width, img_height = 160, 160
class_names = ["Benign", "Malignant"]


@app.post("/upload_file")
async def upload_file(file: UploadFile):
    raw = await file.read()
    filename = file.filename
    with open(filename, "wb") as f:
        f.write(raw)
    image = tf.keras.utils.load_img(file.filename, target_size=(img_width, img_height))
    input_arr = tf.keras.utils.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.
    predictions = model.predict(input_arr)
    predictions = predictions.flatten()
    # Apply a sigmoid since our model returns logits
    predictions = tf.nn.sigmoid(predictions)
    predictions = tf.where(predictions < 0.5, 0, 1)
    os.remove(file.filename)
    predicted_class = class_names[predictions.numpy()[0]]
    return {"prediction": predicted_class}
