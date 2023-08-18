import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const [prediction, setPrediction] = useState<
    "loading..." | "" | "Malignant" | "Benign"
  >("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [showingSplashScreen, setShowingSplashScreen] = useState(true);
  const [splashScreenText, setSplashScreenText] = useState("BC Diagnostics");

  //Splash Screen
  useEffect(() => {
    setTimeout(() => {
      setSplashScreenText("BC Diagnostics.");
      setTimeout(() => {
        setSplashScreenText("BC Diagnostics..");
        setTimeout(() => {
          setSplashScreenText("BC Diagnostics...");
          setTimeout(() => {
            setShowingSplashScreen(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, []);

  async function handleUpload() {
    if (file !== null) {
      try {
        const formData = new FormData();
        formData.append("file", file);
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

  function handleFileSelect() {
    const fileField = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileList = fileField.files as FileList;
    if (fileList[0]) {
      setFile(fileList[0]);
      const fileUrl = URL.createObjectURL(fileList[0]);
      setFileUrl(fileUrl);
    }
  }

  function discard() {
    setFileUrl("");
    setFile(null);
    setPrediction("");
  }

  return (
    <div className="bg-primary/90 w-screen h-screen flex justify-center items-center py-10">
      {showingSplashScreen ? (
        <p className="text-6xl text-white">{splashScreenText}</p>
      ) : (
        <Card className="w-[80vw] h-max">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl mb-2">
              Breast Cancer Diagnosis
            </CardTitle>
            <CardDescription className="text-[hsl(var(--primary))] font-bold">
              {prediction === "loading..." || prediction !== "" ? (
                "From the uploaded ultrasound, this breast tissue is..."
              ) : (
                <>
                  Upload Breast Ultrasound images <br />
                  Only Jpg, jpeg and png files allowed!
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {prediction === "loading..." || prediction !== "" ? (
              <div className="my-[5vh] flex flex-col items-center justify-center">
                {prediction === "loading..." ? (
                  <>
                    <Skeleton className="h-24 w-[25vw]" />
                    <Skeleton className="h-10 w-[7vw] mt-[15vh]" />
                  </>
                ) : (
                  <>
                    <Card className="w-[30vw] h-max">
                      <CardHeader className="text-center">
                        <CardTitle className="text-[hsl(var(--destructive))] ">
                          {prediction}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="mt-[6vh]">Discard</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Your current diagnosis information will be
                            discarded. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button onClick={discard}>Continue</Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            ) : fileUrl !== "" ? (
              <div className="my-[5vh] flex flex-col items-center justify-center">
                <img width="300px" src={fileUrl}></img>
                <div className="flex space-x-2 mt-[6vh]">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Discard</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Your current file data will be discarded. This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button onClick={discard}>Continue</Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button onClick={handleUpload} variant="outline">
                    Diagnose
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-[8vh] mb-[6vh]">
                <Card className="py-6 px-10">
                  <div className="my-[5vh] flex flex-col items-center justify-center">
                    <Label htmlFor="image" className="">
                      Select ultrasound image for upload{" "}
                      <div
                        className="rounded-md border border-input h-10 w-full flex justify-center hover:bg-primary/90
                            items-center text-sm ring-offset-background focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-[5vh] cursor-pointer bg-primary text-primary-foreground"
                      >
                        Choose File
                      </div>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg"
                      className="w-[50%] mt-2 cursor-pointer text-center"
                      onChange={handleFileSelect}
                    />
                  </div>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
