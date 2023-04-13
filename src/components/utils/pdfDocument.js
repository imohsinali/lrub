import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { timeStamp } from "./timeStamp";
const MakePdf = async (
  imgbSeller,
  imgbBuyer,
  imgbWitness,
  witness,
  seller,
  buyer,
  insp,
  land
) => {
  console.log(
    "seller",

    land?.ownerAddress
  );
  const pdfDoc = await PDFDocument?.create();
  const Sellerimage = await pdfDoc?.embedPng(imgbSeller);
  const Buyerimage = await pdfDoc?.embedPng(imgbBuyer);
  const Witnessimage = await pdfDoc?.embedPng(imgbWitness);

  const page = pdfDoc?.addPage([1200, 900]);
  const { width, height } = page.getSize();
  const imgWidth = Math.min(width / 3, Sellerimage.width / 3);
  const imgHeight = Math.min(height / 3, Sellerimage.height / 3);

  page.drawText("Transfer of Land Ownership", {
    x: 500,
    y: height - imgHeight + 130,

    size: 18,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("Seller Information", {
    x: 100,
    y: height - imgHeight + 20,
    size: 14,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawImage(Sellerimage, {
    x: 100,
    y: height - imgHeight - 150,
    width: imgWidth,
    height: imgHeight,
  });

  page.drawText("Name:", {
    x: 100,
    y: height - imgHeight - 180,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(seller?.name, {
    x: 200,
    y: height - imgHeight - 180,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Address:", {
    x: 100,
    y: height - imgHeight - 210,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(seller?.address, {
    x: 200,
    y: height - imgHeight - 210,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Cinc:", {
    x: 100,
    y: height - imgHeight - 240,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(seller?.cnic.toString(), {
    x: 200,
    y: height - imgHeight - 240,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("City:", {
    x: 100,
    y: height - imgHeight - 270,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(seller?.city, {
    x: 200,
    y: height - imgHeight - 270,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Email:", {
    x: 100,
    y: height - imgHeight - 300,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(seller?.email, {
    x: 200,
    y: height - imgHeight - 300,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Buyer Information", {
    x: 700,
    y: height - imgHeight + 20,
    size: 14,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawImage(Buyerimage, {
    x: 700,
    y: height - imgHeight - 150,
    width: imgWidth,
    height: imgHeight,
  });

  page.drawText("Name:", {
    x: 700,
    y: height - imgHeight - 180,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(buyer?.name, {
    x: 800,
    y: height - imgHeight - 180,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Address:", {
    x: 700,
    y: height - imgHeight - 210,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(buyer?.address, {
    x: 800,
    y: height - imgHeight - 210,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Cnic:", {
    x: 700,
    y: height - imgHeight - 240,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(buyer?.cnic.toString(), {
    x: 800,
    y: height - imgHeight - 240,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("City:", {
    x: 700,
    y: height - imgHeight - 270,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(buyer?.city, {
    x: 800,
    y: height - imgHeight - 270,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Email:", {
    x: 700,
    y: height - imgHeight - 300,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(buyer?.email, {
    x: 800,
    y: height - imgHeight - 300,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Witness Information", {
    x: 100,
    y: height - imgHeight - 370,
    size: 14,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawImage(Witnessimage, {
    x: 100,
    y: height - imgHeight - 540,
    width: imgWidth,
    height: imgHeight,
  });

  page.drawText("Name:", {
    x: 100,
    y: height - imgHeight - 570,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(witness?.name, {
    x: 200,
    y: height - imgHeight - 570,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Address:", {
    x: 100,
    y: height - imgHeight - 600,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(witness?.address, {
    x: 200,
    y: height - imgHeight - 600,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("Land Information", {
    x: 700,
    y: height - imgHeight - 370,
    size: 14,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Owner Address:", {
    x: 700,
    y: height - imgHeight - 400,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(land?.ownerAddress.toString(), {
    x: 800,
    y: height - imgHeight - 400,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("Land Address:", {
    x: 700,
    y: height - imgHeight - 430,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(land?.landAddress, {
    x: 800,
    y: height - imgHeight - 430,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Area SqFt:", {
    x: 700,
    y: height - imgHeight - 460,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(land?.landArea.toString(), {
    x: 800,
    y: height - imgHeight - 460,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("Land Price:", {
    x: 700,
    y: height - imgHeight - 490,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(land?.landPrice.toString(), {
    x: 800,
    y: height - imgHeight - 490,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  page.drawText("Property Id:", {
    x: 700,
    y: height - imgHeight - 520,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(land?.propertyPID.toString(), {
    x: 800,
    y: height - imgHeight - 520,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Transfered by:", {
    x: 880,
    y: height - imgHeight - 680,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText(insp, {
    x: 800,
    y: height - imgHeight - 700,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  page.drawText("Transfered date:", {
    x: 800,
    y: height - imgHeight - 730,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });
  const time = new Date();
  const timestamp = time.getTime().toString();
  let verifydate = new Date(timestamp / 1);
  const date = new Date(verifydate.toUTCString());
  verifydate = date.toUTCString();
  const options = { hour12: true };
  verifydate = date.toLocaleString("GMT", options);
  page.drawText(verifydate, {
    x: 870,
    y: height - imgHeight - 730,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};

export default MakePdf;
