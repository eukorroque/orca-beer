/**
 * Esse regex aceita apenas letras (com a acentuação PT-BR), números e espaços.
 * 
 */
const ALPHANUMERIC_REGEX = /^[\p{L}0-9 ]+$/u

export default ALPHANUMERIC_REGEX