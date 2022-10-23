import { FiEdit, FiTrash2 } from "react-icons/fi";
function List({ id, nazov, vymaz, uprav }) {
  return (
    <article key={id}>
      <p>{nazov}</p>
      <div>
        <FiEdit className="success ico" onClick={() => uprav(id)} />
        <FiTrash2 className="danger ico" onClick={() => vymaz(id)} />
      </div>
    </article>
  );
}

export default List;
