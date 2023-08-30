// Local Storage Wrapper
import CryptoJS from 'crypto-js';

class LocalStorageWrapper {
    constructor(prefix = '') {
      this.prefix = prefix;
    }
  
    // Get an item from LocalStorage
    get(key) {
      try {
        const value = localStorage.getItem(this.prefix + key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Error retrieving data from LocalStorage:', error);
        return null;
      }
    }
  
    // Set an item in LocalStorage
    set(key, value) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error storing data in LocalStorage:', error);
        return false;
      }
    }
  
    // Remove an item from LocalStorage
    remove(key) {
      try {
        localStorage.removeItem(this.prefix + key);
        return true;
      } catch (error) {
        console.error('Error removing data from LocalStorage:', error);
        return false;
      }
    }


  // Encrypt and set a securely stored item in LocalStorage
    setSecure(key, value, secretKey) {
        try {
        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
        localStorage.setItem(this.prefix + key, encryptedValue);
        return true;
        } catch (error) {
        console.error('Error storing encrypted data in LocalStorage:', error);
        return false;
        }
    }

    // Decrypt and retrieve a securely stored item from LocalStorage
    getSecure(key, secretKey) {
        try {
        const encryptedValue = localStorage.getItem(this.prefix + key);
        if (!encryptedValue) return null;

        const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
        return decryptedValue ? JSON.parse(decryptedValue) : null;
        } catch (error) {
        console.error('Error retrieving and decrypting data from LocalStorage:', error);
        return null;
        }
    }
  }
  
  export default LocalStorageWrapper;