// utils.js
export function formatPhone(value: string): string {
  // Remove todos os caracteres não numéricos
  let cleaned = value.replace(/\D/g, "");

  // Verifica se tem DDD + número
  if (cleaned.length <= 2) return cleaned; // Se for apenas DDD, retorna como está

  if (cleaned.length <= 6) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`; // Apenas DDD e início do número
  }

  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
      2,
      6
    )}-${cleaned.substring(6)}`; // Número fixo
  }

  if (cleaned.length >= 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
      2,
      7
    )}-${cleaned.substring(7)}`; // Celular
  }

  return cleaned;
}

export const formatarTelefoneA = (telefone: string | null | undefined) => {
  if (!telefone) {
    return "(00) 00000-0000"; // Retorna uma string vazia se telefone for null ou undefined
  }

  const numeros = telefone.replace(/\D/g, "");
  const formatoTelefone = `(${numeros.substring(0, 2)}) ${numeros.substring(
    2,
    7
  )}-${numeros.substring(7)}`;
  console.log(formatoTelefone); // Saída: (12)99629-8976
  return formatoTelefone;
};

// utils/formatNumber.ts
export const formatNumbe1 = (number: number): string => {
  return number.toLocaleString("pt-BR");
};

export const formatNumber = (value: unknown): string => {
  const number = Number(value);
  if (isNaN(number)) {
    return "0";
  }
  return number.toLocaleString("pt-BR");
};

export const formatarTelefone = (
  telefone: string | null | undefined
): string => {
  if (!telefone) {
    //console.log('Número inválido: valor nulo ou indefinido');
    return "(00) 00000-0000"; // Formato padrão caso o telefone seja null ou undefined
  }

  // Remove todos os caracteres não numéricos
  const numeros = telefone.replace(/\D/g, "");
  // console.log('Número limpo:', numeros); // Exibe o número limpo para verificação

  // Verifica o comprimento do número
  if (numeros.length === 11) {
    //console.log('Formato com 11 dígitos detectado');
    return `(${numeros.substring(0, 2)}) ${numeros.substring(
      2,
      7
    )}-${numeros.substring(7)}`;
  } else if (numeros.length === 10) {
    // console.log('Formato com 10 dígitos detectado');
    return `(${numeros.substring(0, 2)}) ${numeros.substring(
      2,
      6
    )}-${numeros.substring(6)}`;
  }

  // Se o número não tiver 10 ou 11 dígitos, retorna o formato padrão
  //console.log('Número inválido: comprimento incorreto');
  return numeros;
};

//teste
export const formatarTelefoneGPT = (
  telefone: string | null | undefined
): string => {
  if (!telefone) {
    console.log("Número inválido: valor nulo ou indefinido");
    return "(00) 00000-0000"; // Formato padrão para número nulo ou indefinido
  }

  // Remove todos os caracteres não numéricos
  const numeros = telefone.replace(/\D/g, "");
  console.log("Número limpo:", numeros); // Log do número limpo

  // Verifica o comprimento do número
  if (numeros.length === 11) {
    // Número de 11 dígitos (DDD + número com 9 dígitos)
    const ddd = numeros.substring(0, 2); // Pega os primeiros dois dígitos para o DDD
    const parteInicial = numeros.substring(2, 7); // Próximos cinco dígitos
    const parteFinal = numeros.substring(7); // Últimos quatro dígitos

    console.log(
      `DDD: ${ddd}, Parte inicial: ${parteInicial}, Parte final: ${parteFinal}`
    );
    return `(${ddd}) ${parteInicial}-${parteFinal}`;
  } else if (numeros.length === 10) {
    // Número de 10 dígitos (DDD + número com 8 dígitos)
    const ddd = numeros.substring(0, 2); // Pega os primeiros dois dígitos para o DDD
    const parteInicial = numeros.substring(2, 6); // Próximos quatro dígitos
    const parteFinal = numeros.substring(6); // Últimos quatro dígitos

    console.log(
      `DDD: ${ddd}, Parte inicial: ${parteInicial}, Parte final: ${parteFinal}`
    );
    return `(${ddd}) ${parteInicial}-${parteFinal}`;
  }

  // Caso o número não tenha 10 ou 11 dígitos, retorna o formato padrão
  console.log("Número inválido: comprimento incorreto");
  return "(00) 00000-0000";
};

export const formatPhoneNumberInter = (phone: string) => {
  // Remove qualquer caractere não numérico
  const cleaned = phone.replace(/\D/g, "");

  // Verifica se começa com o código do país (55) e remove
  const withoutCountryCode = cleaned.startsWith("55")
    ? cleaned.slice(2)
    : cleaned;

  // Verifica se o número tem 11 dígitos (com DDD) ou 10 dígitos (fixo)
  if (withoutCountryCode.length === 11) {
    return `(${withoutCountryCode.slice(0, 2)}) ${withoutCountryCode.slice(
      2,
      7
    )}-${withoutCountryCode.slice(7)}`;
  } else if (withoutCountryCode.length === 10) {
    return `(${withoutCountryCode.slice(0, 2)}) ${withoutCountryCode.slice(
      2,
      6
    )}-${withoutCountryCode.slice(6)}`;
  }

  return phone; // Retorna o original se não for um formato esperado
};
