# Phantom Wallet Passphrase Cracking Application

This is an application designed to exploit a vulnerability in Phantom wallets to crack 12-word passphrases. The application utilizes Node.js and the Puppeteer library for automated interaction with Phantom wallet interfaces.

## Video Demonstration


https://github.com/SathruwanCooray/Phantom_Wallet_Passphrase_Cracking_Application/assets/150252729/0c6d6ce4-9608-4744-97f5-5adc4095af5d


## Overview

The Phantom Wallet Passphrase Cracking Application aims to exploit a specific vulnerability in Phantom wallets. When provided with a 12-word passphrase, Phantom wallets check the validity of each word against a predefined set of accepted phrases. If any word in the passphrase is not in their system, the wallet marks the entire passphrase as invalid.

## Functionality

### Vulnerability Exploitation

The application systematically checks the validity of each word in a dictionary against Phantom's passphrase validation system. It performs the following steps:

1. **Dictionary Check:** Iterates through a dictionary of words.
2. **Validation Testing:** Constructs potential 12-word passphrases by substituting each word in the dictionary for one of the passphrase words.
3. **Validation Process:** Uses Puppeteer to automate the input of each passphrase into the Phantom wallet interface to check its validity.
4. **Saving Valid Passphrases:** Stores valid passphrases (those accepted by the wallet) in a JSON file for further analysis and use in cracking wallets.

### Combinatorial Analysis and Time Estimate

Cracking a 12-word passphrase is computationally intensive due to the large number of possible combinations:

- **Combination Count:** A typical 12-word passphrase has \( 2048^{12} \) possible combinations, which is infeasible to test exhaustively.
- **Time Estimate:** Given current computational resources and assuming continuous testing, the application estimates it could take several years or more to crack a single 12-word passphrase, depending on the dictionary size and validation speed.

### Usage

To use the Phantom Wallet Passphrase Cracking Application:

1. Run the application using Node.js.
2. Monitor the console for progress updates on tested passphrases.
3. Review the JSON file generated to access valid passphrases for further analysis or cracking attempts.

## Security Note

This application is intended for educational and research purposes only. Unauthorized use of such tools may violate terms of service or local laws. Always ensure ethical use and obtain necessary permissions before conducting security testing.

## Author

[Sathruwan Hansith] - [20220659]

## License

This project is licensed under MIT License. Permission is hereby granted to use, modify, and distribute the software as per the terms of the license.

## Acknowledgments

Special thanks to the developers of Node.js, Puppeteer library, and Phantom wallet for their contributions and technologies that made this application possible.
