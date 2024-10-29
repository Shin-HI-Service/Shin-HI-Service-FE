// 파일명: rsaEncryption.ts

// 공개 키를 CryptoKey 객체로 변환하는 함수
async function importPublicKey(pemKey: string): Promise<CryptoKey> {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";

  // PEM 형식의 키를 Base64로 디코딩
  const base64 = pemKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s+/g, "");
  const binaryDer = atob(base64);
  const binaryDerArray = new Uint8Array(binaryDer.length);

  for (let i = 0; i < binaryDer.length; i++) {
    binaryDerArray[i] = binaryDer.charCodeAt(i);
  }

  // ArrayBuffer로 변환
  const keyData = binaryDerArray.buffer;

  // 공개 키를 CryptoKey 객체로 가져오기
  return window.crypto.subtle.importKey(
    "spki", // 공개 키 형식
    keyData,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" },
    },
    true, // 키가 추출 가능해야 함
    ["encrypt"]
  );
}

// 비공개 키를 CryptoKey 객체로 변환하는 함수
async function importPrivateKey(pemKey: string): Promise<CryptoKey> {
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";

  // PEM 형식의 키를 Base64로 디코딩
  const base64 = pemKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s+/g, "");
  const binaryDer = atob(base64);
  const binaryDerArray = new Uint8Array(binaryDer.length);

  for (let i = 0; i < binaryDer.length; i++) {
    binaryDerArray[i] = binaryDer.charCodeAt(i);
  }

  // ArrayBuffer로 변환
  const keyData = binaryDerArray.buffer;

  // 비공개 키를 CryptoKey 객체로 가져오기
  return window.crypto.subtle.importKey(
    "pkcs8", // 비공개 키 형식
    keyData,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" },
    },
    true, // 키가 추출 가능해야 함
    ["decrypt"]
  );
}

// 텍스트를 암호화하는 함수
async function encryptText(
  publicKey: CryptoKey,
  plainText: string
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  // 공개 키로 암호화
  return window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    data
  );
}

// 암호화된 데이터를 복호화하는 함수
async function decryptText(
  privateKey: CryptoKey,
  encryptedData: ArrayBuffer
): Promise<string> {
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedData
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}

// 환경 변수에서 공개 키를 사용하여 텍스트를 암호화하는 함수
export async function encryptWithPublicKey(plainText: string): Promise<string> {
  const base64PublicKey = import.meta.env.VITE_MAIN_SERVER_PUBLIC_KEY;

  if (!base64PublicKey) {
    throw new Error("Public key is not defined in environment variables");
  }

  try {
    const publicKey = await importPublicKey(base64PublicKey);
    const encryptedBuffer = await encryptText(publicKey, plainText);

    // 암호화된 텍스트를 Base64로 인코딩하여 반환
    const encryptedBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encryptedBuffer))
    );

    return encryptedBase64;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error; // 에러를 상위 호출자에게 전달
  }
}

// 암호화된 데이터를 복호화하는 함수, (테스트용)
export async function decryptWithPrivateKey(
  encryptedBase64: string
): Promise<string> {
  const base64PrivateKey = import.meta.env.VITE_PRIVATE_KEY;
  if (!base64PrivateKey) {
    throw new Error("Private key is not defined in environment variables");
  }

  try {
    const privateKey = await importPrivateKey(base64PrivateKey);

    // Base64로 인코딩된 암호화된 데이터를 ArrayBuffer로 변환
    const encryptedData = Uint8Array.from(atob(encryptedBase64), (c) =>
      c.charCodeAt(0)
    ).buffer;

    const decryptedText = await decryptText(privateKey, encryptedData);

    return decryptedText;
  } catch (error) {
    console.error("Decryption error:", error);
    throw error; // 에러를 상위 호출자에게 전달
  }
}

// 키 생성 함수 (테스트용)
export async function generateRSAKeyPair(): Promise<void> {
  try {
    // RSA 키 쌍 생성
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048, // 키 길이
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: { name: "SHA-256" },
      },
      true, // 키가 추출 가능해야 함
      ["encrypt", "decrypt"] // 사용할 수 있는 작업
    );

    // 공개 키와 비공개 키를 PEM 형식으로 인코딩
    const publicKeyPem = await exportKeyToPEM(keyPair.publicKey, "public");
    const privateKeyPem = await exportKeyToPEM(keyPair.privateKey, "private");

    console.log("Public Key:", publicKeyPem);
    console.log("Private Key:", privateKeyPem);
  } catch (error) {
    console.error("Error generating RSA key pair:", error);
  }
}

async function exportKeyToPEM(
  key: CryptoKey,
  type: "public" | "private"
): Promise<string> {
  const keyData = await window.crypto.subtle.exportKey(
    type === "public" ? "spki" : "pkcs8", // 공개 키와 비공개 키의 형식
    key
  );

  const keyArray = new Uint8Array(keyData);
  const keyBase64 = btoa(String.fromCharCode(...keyArray)); // Base64 인코딩
  const keyPem = `-----BEGIN ${type.toUpperCase()} KEY-----\n${keyBase64
    .match(/.{1,64}/g)
    ?.join("\n")}\n-----END ${type.toUpperCase()} KEY-----`;

  return keyPem;
}
