export const handleCopy = (text) => {
  // Create a temporary input element to hold the text
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  // Copy the text to the clipboard
  document.execCommand("copy");
  document.body.removeChild(input);
};
