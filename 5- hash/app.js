"use strict";
// // OffsetBasis = 2166136261;
// // FNVPrime = 16777619;
// class Hash {
//   public hash32(string: string) {
//     const offsetBasis: number = 2166136261;
//     const FNVPrime: number = 16777619;
//     const bytes: number[] = this.convertToBytes(string);
//     let hash = offsetBasis;
//     for (let i = 0; i < bytes.length; i++) {
//       hash = hash ^ Number(bytes[i]);
//       hash = Math.imul(hash, FNVPrime);
//     }
//     console.log(string + ", " + hash + ", " + hash.toString(16));
//     return hash >>> 0;
//   }
//   private stringToUtf8Bytes(str: string): number[] {
//     // Browser/Node.js (modern environments)
//     const encoder = new TextEncoder();
//     return Array.from(encoder.encode(str));
//   }
//   private convertToBytes(string: string) {
//     let bytes: number[] = [];
//     for (let i = 0; i < string.length; i++) {
//       const code = string.charCodeAt(i);
//       bytes.push(code & 0xFF);
//       bytes.push((code >> 8) && 0xFF);
//     }
//     return bytes;
//   }
// }
// const hash = new Hash();
// console.log(hash.hash32("This is Original Text"));
class Hash {
    hash32(str) {
        // FNV constants for 32-bit hashes
        const FNV_OFFSET_BASIS = 2166136261; // Hexadecimal: 0x811C9DC5
        const FNV_PRIME = 16777619; // Hexadecimal: 0x01000193
        // Initialize hash to FNV offset basis
        let hash = FNV_OFFSET_BASIS;
        // Convert string to bytes using UTF-8 encoding
        // Input: JavaScript string (UTF-16)
        // Output: Uint8Array of UTF-8 bytes
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        // Process each byte in the array
        for (let i = 0; i < data.length; i++) {
            // XOR hash with current byte
            // JavaScript converts bytes to 32-bit integers automatically
            hash ^= data[i];
            // Multiply by FNV prime and maintain 32-bit integer
            // Using Math.imul for proper 32-bit multiplication
            hash = Math.imul(hash, FNV_PRIME);
            // Convert to unsigned 32-bit integer using zero-fill right shift
            hash >>>= 0;
        }
        // Final conversion to ensure unsigned 32-bit integer
        return hash >>> 0;
    }
    hash64(str) {
        const FNV_OFFSET_BASIS_64 = 0xcbf29ce484222325n;
        const FNV_PRIME_64 = 0x100000001b3n;
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        let hash = FNV_OFFSET_BASIS_64;
        for (const byte of bytes) {
            hash ^= BigInt(byte);
            hash *= FNV_PRIME_64;
            hash &= 0xffffffffffffffffn;
        }
        return hash;
    }
}
// Example usage
const hasher = new Hash();
const input = "This is Original Text";
const result = hasher.hash32(input);
console.log(`Input: "${input}"`);
console.log(`Decimal: ${result}`);
console.log(`Hexadecimal: 0x${result.toString(16).toUpperCase()}`);
const result2 = hasher.hash64(input);
console.log("--------------");
console.log(`Input: "${input}"`);
console.log(`Decimal: ${result2}`);
console.log(`Hexadecimal: 0x${result2.toString(16)}`);
