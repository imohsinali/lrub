
export const B32S=(value)=>
{

// Remove the '0x' prefix and convert the remaining string to a byte array
const byteArr = value
  .slice(2)
  .match(/.{1,2}/g)
  .map((byte) => parseInt(byte, 16));

// Convert the byte array to a string using the ASCII character encoding
const str = String.fromCharCode(...byteArr);
return str
}
