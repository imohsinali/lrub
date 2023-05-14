export const timeStamp = (time) => {
  let verifydate = new Date(time * 1000); // convert seconds to milliseconds
  const date = new Date(verifydate.toUTCString());
  verifydate = date.toUTCString();
  const options = { hour12: true };
  verifydate = date.toLocaleString("GMT", options);
  return verifydate;
};

export const age = (birthTimestamp) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // current timestamp in seconds
  const ageInSeconds = currentTimestamp - birthTimestamp;
  let outputString = "";

  if (ageInSeconds < 60) {
    outputString = `${ageInSeconds} s`;
  } else if (ageInSeconds < 3600) {
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 86400) {
    const ageInHours = Math.floor(ageInSeconds / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 2592000) {
    const ageInDays = Math.floor(ageInSeconds / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 31536000) {
    const ageInMonths = Math.floor(ageInSeconds / 2592000);
    const remainingDays = Math.floor((ageInSeconds % 2592000) / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInMonths} mon ${remainingDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else {
    const ageInYears = Math.floor(ageInSeconds / 31536000);
    const remainingMonths = Math.floor((ageInSeconds % 31536000) / 2592000);
    const remainingDays = Math.floor((ageInSeconds % 2592000) / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInYears} y ${remainingMonths} mon ${remainingDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  }

  console.log(`The age is: ${outputString}`);

  return outputString;
};

export const handleTimeFilter = (setTransaction, setOrder,order, transactions) => {
  const sorted =
    order == "desc"
      ? transactions.sort((a, b) => b.timeStamp - a.timeStamp)
      : transactions.sort((a, b) => a.timeStamp - b.timeStamp);
console.log(sorted)
  setTransaction(sorted);
  setOrder(order === "desc" ? "asc" : "desc"); // Toggle the order direction
};
