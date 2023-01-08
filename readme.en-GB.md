
# Activation Key Generator for PSA Group Vehicle Map Updates

This script is used to generate an activation key for a specific map update file _(CCT.DAT.inf)_ and VIN number. Generated keys are compatible with most navigation systems in PSA group vehicles (Citroen, Peugeot, DS Automobile) including:

-   RT6 - CCT.DAT.inf file from the main directory `\`
-   SMEG - CCT.DAT.inf file from `SMEG_UPG\DATA` folder
-   SMEG+ - CCT.DAT.inf file from `SMEG_PLUS_UPG\DATA` folder
-   SMEG IV2 - CCT.DAT.inf file from `SMEG_IV2_UPG\DATA` folder

The activation key is calculated using the Twofish algorithm and is based on the contents of the `CCT.DAT.inf` file and the VIN number. The file is read and its content is used as input data to the Twofish algorithm, along with the VIN number and a constant initialization vector. The encrypted data obtained is then used to generate the activation key, which is returned as a string.

## `generate` function
```js
import generator from './generator';

generator(filePath: string, vinNumber: string) => Promise<string>
```

-   `filePath` - path to the file (`CCT.DAT.inf`).
-   `vinNumber` - VIN number to generate the key for.

Returns: a Promise object containing the generated activation key as a string. If the VIN number is too short or an error occurs while reading the file, an error is returned.

There is a sample `CCT.DAT.inf` file in the repository.

## Requirements

-   node.js v12 or higher
-   npm v6 or higher

## Installation

To install dependencies, run the command: `npm install`

## Usage

To generate an activation key:
  1. Edit the contents of the index.js file according to example below:
  ```js
  Keygen('/path/to/CCT.DAT.inf', 'EXAMPLE_VIN_NUMBER');
  ```
  2. Run the scripts with the command: `node index.js`
  3. The generated activation key will be displayed in the console.

![Screenshoot](https://github.com/HotFr1dge/psa-maps-activation-tool/blob/main/screenshoot.png?raw=true)
