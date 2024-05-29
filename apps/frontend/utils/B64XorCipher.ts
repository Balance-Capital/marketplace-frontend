/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
const KEY = process.env.B64XOR_SECRET || 'DefaultSecretKey';

const xorStrings = (input: string) => {
    let output='';
    for(let i=0; i<input.length; i++){
      const c = input.charCodeAt(i);
      const k = KEY.charCodeAt(i%KEY.length);
      output += String.fromCharCode(c ^ k);
    };
    return output;
};

const B64XorCipher = {
    encode: (input: string) => Buffer.from(xorStrings(input), 'utf8').toString('base64'),
    decode: (input: string) => xorStrings( Buffer.from(input, 'base64').toString('utf8') )
};

export default B64XorCipher