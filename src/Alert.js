import { useEffect } from "react";

function Alert({ alert, msg, typ, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      alert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={typ}>{msg}</p>;
}

export default Alert;
