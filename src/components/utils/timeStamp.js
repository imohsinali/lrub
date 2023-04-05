export const timeStamp=(time)=>{
  let verifydate = new Date(time * 1000); // convert seconds to milliseconds
  const date = new Date(verifydate.toUTCString());
  verifydate = date.toUTCString();
  const options = { hour12: true };
  verifydate = date.toLocaleString("GMT", options);
  return verifydate 
}

