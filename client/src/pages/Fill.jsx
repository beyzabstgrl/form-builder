// src/pages/Fill.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { getForm } from "../lib/api";

// 🔧 Şemayı güvenli hale getir
const normalizeSchema = (schema = []) => {
  const STATIC = new Set(["Header", "Label", "Paragraph", "LineBreak", "Image"]);
  return schema.map((it, i) => {
    const item = { ...it };

    // 1) field_name yoksa oluştur
    if (!item.field_name || typeof item.field_name !== "string") {
      const base = (item.element || "field").toLowerCase();
      item.field_name = `${base}_${i}`;
    }

    // 2) Statik öğelerde required kapalı olsun
    if (STATIC.has(item.element)) {
      item.required = false;
    }

    // 3) Seçenekli alanlarda value/text garantile
    if (
      ["Dropdown", "Tags", "RadioButtons", "Checkboxes"].includes(item.element) &&
      Array.isArray(item.options)
    ) {
      item.options = item.options.map((o, j) => ({
        ...o,
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

  useEffect(() => {
    getForm(id).then((res) => {
      setName(res.name || "Form");
      setData(normalizeSchema(res.schema || [])); // <- burada temizle
    });
  }, [id]);

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
        submitButton={<button className="btn" type="submit">Submit</button>}
      />
    </div>
  );
}
