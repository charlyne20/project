import { useState } from "react";

function App() {
  const [prediction, setPrediction] = useState("");

  async function handleUpload() {
    const formData = new FormData();
    const fileField = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileList = fileField.files as FileList;
    formData.append("file", fileList[0]);
    if (fileList[0]) {
      try {
        setPrediction("loading...");
        const response = await fetch("http://localhost:8000/upload_file", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        setPrediction(result.prediction);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen overflow-hidden">
      <p>Breast cancer diagnosis</p>
      <p>Upload Breast Ultrasound images</p>
      <p>Only Jpg, jpeg and png files allowed!</p>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
      />
      <button onClick={handleUpload}>Upload</button>
      <p>or</p>
      <p>Drag & Drop</p>
      <p>Ultrasound images here</p>
      <div>Prediction is: {prediction || "no prediction yet"}</div>
    </div>
  );
}

export default App;
