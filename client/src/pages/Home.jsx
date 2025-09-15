import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listForms } from '../lib/api'

export default function Home(){
  const [items, setItems] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(()=>{ listForms().then(setItems).catch(setErr) },[])

  if(err) return <div className="card">Hata: {String(err)}</div>
  if(!items) return <div className="card">Yükleniyor...</div>

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Kayıtlı Formlar</h2>
      {items.length === 0 ? (
        <p className="muted">Henüz form yok. <Link to="/builder">Yeni Form Oluştur</Link></p>
      ) : (
        <ul className="list">
          {items.map(f=>(
            <li key={f.id}>
              <div>
                <strong>{f.name}</strong>
                <div className="muted" style={{fontSize:12}}>ID: {f.id} • {f.created_at}</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <Link className="btn" to={`/forms/${f.id}/fill`}>Doldur</Link>
                <Link className="btn" to={`/builder?id=${f.id}`}>Düzenle</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
