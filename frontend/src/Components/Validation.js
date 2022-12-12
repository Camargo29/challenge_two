import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string("Digite apenas letras").required("Nome é requerido"),
    datanacimento: yup
      .date("Precisa ser uma data válida")
      .required("selecione sua data de nacimento"),
    email: yup
      .string("Digite seu Email")
      .email("Email inválido")
      .required("Email é obrigatório"),
    address: yup
      .string("Digite seu endereço")
      .required("Endereço é obrigatório"),
    number: yup
      .number("Apenas números")
      .integer("Apenas números inteiros")
      .typeError("Número é obrigatório")
      .required("Número é obrigatório"),
  })
  .required();

export default schema;
