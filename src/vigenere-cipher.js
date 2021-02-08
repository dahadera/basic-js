const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(flag = true) {
    this.isDirect = flag;
    this.offset = 65;
    this.n = 26;
  }
  encrypt(message, string) {
    if (message == undefined || string == undefined)
      throw new Error();
    
    message = message.toUpperCase();
    string = string.toUpperCase();

    let encryptedMessage = "";
    let keyPos = 0;
    for (let i = 0; i < message.length; i++) {
      if (message[i].charCodeAt(0) < 65 || message[i].charCodeAt(0) > 90) {
        encryptedMessage += message[i];
        continue;
      }

      let keyChar = string[keyPos % string.length];
      let mj = message.charCodeAt(i) - this.offset;
      let kj = keyChar.charCodeAt(0) - this.offset;
      let cj = (mj + kj) % this.n + this.offset;
      let encryptedChar = String.fromCharCode(cj);
      encryptedMessage += encryptedChar;
      keyPos++;
    }
    
    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }
  decrypt(encryptedMessage, string) {
    if (encryptedMessage == undefined || string == undefined)
    throw new Error();
  
    encryptedMessage = encryptedMessage.toUpperCase();
    string = string.toUpperCase();

    let decryptedMessage = "";
    let keyPos = 0;
    for (let i = 0; i < encryptedMessage.length; i++) {
      if (encryptedMessage[i].charCodeAt(0) < 65 || encryptedMessage[i].charCodeAt(0) > 90) {
        decryptedMessage += encryptedMessage[i];
        continue;
      }

      let keyChar = string[keyPos % string.length];
      let cj = encryptedMessage.charCodeAt(i) - this.offset;
      let kj = keyChar.charCodeAt(0) - this.offset;
      let mj = (cj + this.n - kj) % this.n + this.offset;
      let decryptedChar = String.fromCharCode(mj);
      decryptedMessage += decryptedChar;
      keyPos++;
    }

    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}

module.exports = VigenereCipheringMachine;
