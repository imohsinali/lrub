import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  Button,
  Center,
  Stack,
  Text,
  VStack,
  Input,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

const UserInformationForm = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const videoRef = useRef(null);

  const startCapture = async () => {
    setIsCapturing(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  };

  const stopCapture = async () => {
    setIsCapturing(false);
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const imageBytes = canvas.toDataURL("image/png").split(",")[1];
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.addPage([canvas.width, canvas.height]);
    const { width, height } = page.getSize();
    const imgWidth = Math.min(width / 3, image.width / 3);
    const imgHeight = Math.min(height / 3, image.height / 3);

    page.drawText("Transfer of Land Ownership", {
      x: 200,
      y: height - imgHeight + 130,

      size: 18,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });
    page.drawImage(image, {
      x: 100,
      y: height - imgHeight - 70,
      width: imgWidth,
      height: imgHeight,
    });

    page.drawText("Name:", {
      x: 100,
      y: height - imgHeight - 90,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText(name, {
      x: 200,
      y: height - imgHeight - 100,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText("Email:", {
      x: 100,
      y: height - imgHeight - 110,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText(email, {
      x: 200,
      y: height - imgHeight - 110,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText("Address:", {
      x: 100,
      y: height - imgHeight - 120,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText(address, {
      x: 200,
      y: height - imgHeight - 120,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });
    page.drawText("Phone Number:", {
      x: 100,
      y: height - imgHeight - 140,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    page.drawText(phoneNumber, {
      x: 200,
      y: height - imgHeight - 140,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Download the PDF file
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_information.pdf";
    link.click();

    // Stop video and release resources
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
  };

  return (
    <Center>
      <Stack spacing={4} align="center">
        <Flex width={300}>
          <Center>
            <video
              ref={videoRef}
              style={{ display: isCapturing ? "block" : "none" }}
            ></video>
          </Center>
        </Flex>
        <Button onClick={startCapture} disabled={isCapturing} color={"black"}>
          Capture Picture
        </Button>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </VStack>
        <Button onClick={stopCapture}>Generate PDF</Button>
      </Stack>
    </Center>
  );
};

export default UserInformationForm;
