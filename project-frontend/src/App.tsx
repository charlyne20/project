function App() {
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
      <p>or</p>
      <p>Drag & Drop</p>
      <p>Ultrasound images here</p>
    </div>
  );
}

export default App;
