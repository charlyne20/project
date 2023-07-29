from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# import tensorflow as tf

app = FastAPI()

origins = ["http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
# model = load_model("Resnet_BCDetection.h5")
# preprocess_input = tf.keras.applications.vgg16.preprocess_input


@app.post("/upload_file")
async def upload_file(file: UploadFile):
    contents = await file.read()
    # prediction = model.predict(contents)
    return {"prediction": "here!!!"}
