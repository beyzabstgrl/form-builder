// src/pages/Fill.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { getForm } from "../lib/api";

// 🔧 Şemayı normalize eden yardımcı
const normalizeSchema = (schema = []) => {
  const STATIC = new Set(["Header", "Label", "Paragraph", "LineBreak", "Image"]);
  return (schema || []).map((it, i) => {
    const item = { ...it };

    // field_name zorunlu → yoksa üret
    if (!item.field_name || typeof item.field_name !== "string") {
      const base = (item.element || "field").toLowerCase();
      item.field_name = `${base}_${i}`;
    }

    // Statik öğelerde required kapalı
    if (STATIC.has(item.element)) {
      item.required = false;
    }

    // Seçenekli öğelerde value/text yapısını sabitle
    if (
      ["Dropdown", "Tags", "RadioButtons", "Checkboxes"].includes(item.element)
    ) {
      item.options = (item.options || []).map((o, j) => ({
        key: o.key ?? o.value ?? `opt_${j}`, // ✅ ReactFormGenerator key istiyor
        value: o.value ?? o.key ?? `opt_${j}`,
        text: o.text ?? o.label ?? `Seçenek ${j + 1}`,
      }));
    }

    return item;
  });
};

export default function Fill() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  // Formu backend’den al
  useEffect(() => {
    getForm(id).then((res) => {
      setName(res.name || "Form");
      setData(normalizeSchema(res.schema || []));
    });
  }, [id]);

  // Form gönderim handler
  const handleSubmit = (answers) => {
    console.log("Yanıtlar:", answers);
    alert("Gönderildi!");
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{name}</h2>
      <ReactFormGenerator
        data={data}
        onSubmit={handleSubmit}
        submitButton={
          <button className="btn" type="submit">
            Gönder
          </button>
        }
      />
    </div>
  );
}
