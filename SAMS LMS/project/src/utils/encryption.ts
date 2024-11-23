import bcrypt from 'bcryptjs';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Browser-compatible encryption for sensitive data
export const encryptData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  // Use Web Crypto API for encryption
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt']
  );
  
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    dataBuffer
  );
  
  // Convert to base64 for storage/transmission
  const encryptedArray = new Uint8Array(encryptedData);
  const ivString = btoa(String.fromCharCode(...iv));
  const encryptedString = btoa(String.fromCharCode(...encryptedArray));
  
  return `${ivString}.${encryptedString}`;
};

// Browser-compatible decryption for sensitive data
export const decryptData = async (encryptedData: string): Promise<string> => {
  const [ivString, encryptedString] = encryptedData.split('.');
  
  const iv = Uint8Array.from(atob(ivString), c => c.charCodeAt(0));
  const encryptedArray = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
  
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['decrypt']
  );
  
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encryptedArray
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
};

export const generateSHA256Hash = (data: string): string => {
  return CryptoJS.SHA256(data).toString();
};

export const generateSHA512Hash = (data: string): string => {
  return CryptoJS.SHA512(data).toString();
};