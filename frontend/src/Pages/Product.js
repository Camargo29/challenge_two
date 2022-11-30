import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Paciente = () => {
  // 4 - rota dinâmica
  const { id } = useParams();

  //   5 - carregamento dado individual
  const url = "http://localhost:3000/Pacientes/" + id;

  const { data: product, loading, erro } = useFetch(url);

  console.log(product);
  return (
    <>
      <p>ID do produto: {id}</p>
      {erro && <p>Ocorreu um erro</p>}
      {loading && <p>Carregando...</p>}
      {product && (
        <div>
          <h1>{product.name}</h1>
          <p>R$ {product.price}</p>
          {/* 6 - nested router */}
          <Link to={`/products/${product.id}/Info`}>Mais informações</Link>
        </div>
      )}
    </>
  );
};

export default Paciente;
