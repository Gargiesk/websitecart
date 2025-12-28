import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    axios.get(`https://websitecart-backend.onrender.com/templates/${id}`).then(res => {
      setTemplate(res.data);
    });
  }, []);

  if (!template) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container py-5">
      <h2>{template.name}</h2>
      <p>{template.type} • {template.style}</p>
      <a href={template.demoUrl} className="btn btn-dark" target="_blank">Open Demo</a>
    </div>
  );
}
