/**
 * Generates activation keys for a given file and VIN numbers.
 *
 * The activation key is calculated using the Twofish algorithm and is based on the
 * contents of the file and the VIN number. The file is read and its contents are
 * used as input to the Twofish algorithm, along with the VIN number and a fixed
 * initialization vector. The resulting encrypted data is then used to generate the
 * activation key, which is returned as a string.
 *
 * @module generator
 */

import { twofish } from 'twofish';
import fs from 'fs';
import path from 'path';

const map = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ0123456789ABCDEFGHJKLMNPQRSTUV';
const init_vector = new Int8Array([-83, 44, -122, -99, -8, -54, -85, 85, 17, 42, 30, -126, -103, 108, 118, 107]);

/**
 * Encrypts an array of bytes using the Twofish algorithm.
 *
 * @param {Int8Array} paramArrayOfbyte1 The array of bytes to encrypt.
 * @param {Int8Array} paramArrayOfbyte2 The key to use for the encryption.
 * @return {Int8Array} The encrypted array of bytes.
 * @throws {Error} If there is an error during encryption.
 */
function encrypt(paramArrayOfbyte1, paramArrayOfbyte2) {
	let arrayOfByte;
	try {
		arrayOfByte = new Int8Array(twofish().encrypt([...paramArrayOfbyte2], [...paramArrayOfbyte1]));
	}
	catch (err) {
		throw new Error(err);
	}

	for (let b = 0; b < 16; b++) {
		arrayOfByte[b] = paramArrayOfbyte2[b] ^ arrayOfByte[b];
	}
	return arrayOfByte.slice(0, 16);
}

/**
 * Generates an activation key for a given file and VIN number.
 *
 * @param {string} filePath The path to the file.
 * @param {string} vinNumber The VIN number to use for generating the key.
 * @return {string} The generated activation key.
 * @throws {Error} If the VIN number is too short or if there is an error reading the file.
 */
export default async function generate(filePath, vinNumber) {
	let arrayOfByte1 = new Int8Array(9);
	const arrayOfByte2 = new Int8Array(12);
	const arrayOfByte3 = new Int8Array(17);
	const arrayOfByte4 = new Int8Array(33);
	const arrayOfByte5 = new Int8Array(16);

	let i = 0;
	if (vinNumber.length < 17) {
		throw new Error('Podany numer VIN jest za krótki!');
	}

	try {
		const data = await fs.promises.readFile(path.resolve(filePath));
		arrayOfByte1 = Int8Array.from(data).slice(0, 9);
		arrayOfByte1[8] = 0;
	}
	catch (err) {
		throw new Error(err);
	}

	for (let b1 = 0; b1 < 9; b1++) {
		const b = vinNumber.charCodeAt(b1 + 8);
		arrayOfByte2[b1] = b;
		i += b;
	}
	i = (i ^ 0xFFFFFFFF) + 1 & 0xFF;

	const arrayOfChar = String(i).padStart(2, '0').split('');

	arrayOfByte2[10] = arrayOfChar[0].charCodeAt(0);
	arrayOfByte2[11] = arrayOfChar[1].charCodeAt(0);

	// logging map_code & vin_code
	console.log('map_code=' + String.fromCharCode(...arrayOfByte1));
	console.log('vin_code=' + String.fromCharCode(...arrayOfByte2));

	let b2;
	for (b2 = 0; b2 < 9; b2++) {
		arrayOfByte4[2 * b2] = arrayOfByte2[b2];
		arrayOfByte4[2 * b2 + 1] = arrayOfByte2[b2];
	}
	for (b2 = 0; b2 < 7; b2++) {
		arrayOfByte4[18 + 2 * b2] = arrayOfByte1[b2];
		arrayOfByte4[18 + 2 * b2 + 1] = arrayOfByte1[b2];
	}

	arrayOfByte4[31] = arrayOfByte1[7];
	arrayOfByte4[32] = 0;

	for (b2 = 0; b2 < 16; b2++) {
		arrayOfByte5[b2] = init_vector[b2];
	}

	let arrayOfByte6 = encrypt(arrayOfByte4, arrayOfByte5);

	for (b2 = 0; b2 < 16; b2++) {
		arrayOfByte5[b2] = arrayOfByte6[b2];
		arrayOfByte4[b2] = arrayOfByte4[b2 + 16];
	}

	arrayOfByte6 = encrypt(arrayOfByte4, arrayOfByte5);

	for (b2 = 0; b2 < 16; b2++) {
		arrayOfByte3[b2] = map.charCodeAt(arrayOfByte6[b2] >> 1 & 0x3F);
	}
	arrayOfByte3[16] = 0;

	console.log('Activation key: ' + '\x1b[32m' + String.fromCharCode.apply(null, arrayOfByte3) + '\x1b[0m');

	return String.fromCharCode.apply(null, arrayOfByte3);
}