const getCameraStreams = async (setCamera1, setCamera2, setCamera3) => {
  try {
    const stream1 = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    setCamera1(stream1);

    const stream2 = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    setCamera2(stream2);

    const stream3 = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    setCamera3(stream3);
  } catch (err) {
    console.error(err);
  }
};

export default getCameraStreams