import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ReactFormBuilder, ElementStore } from 'react-form-builder2'
import 'react-form-builder2/dist/app.css'
import { createForm, getForm, updateForm } from '../lib/api'

export default function Builder(){
  const [params] = useSearchParams()
  const id = params.get('id')
  const navigate = useNavigate()

  const [name, setName] = useState('Yeni Form')
  const [schema, setSchema] = useState([])
  const [loading, setLoading] = useState(!!id)

  // Builder değiştikçe şemayı yakala
  useEffect(()=>{
    const unsub = ElementStore.subscribe(st => setSchema(st.data || []))
    return ()=>unsub()
  },[])

  // Düzenle modunda mevcut şemayı yükle
  useEffect(()=>{
    if(!id) return
    setLoading(true)
    getForm(id).then(data=>{
      setName(data.name || 'Form')
      setSchema(data.schema || [])
    }).finally(()=> setLoading(false))
  },[id])

  const initialData = useMemo(()=> schema, [schema])

  const showToast = (type, title, msg)=>{
    const id = 't_'+Date.now()
    const root = document.querySelector('.toast-root') || (()=>{
      const el = document.createElement('div')
      el.className = 'toast-root'
      document.body.appendChild(el)
      return el
    })()
    const toast = document.createElement('div')
    toast.className = `toast toast--${type}`
    toast.innerHTML = `<div><div class="toast-title">${title}</div><div class="toast-msg">${msg||''}</div></div><button class="toast-close">✕</button>`
    toast.querySelector('.toast-close').onclick = ()=> root.removeChild(toast)
    root.appendChild(toast)
    setTimeout(()=>{ if(toast.parentNode===root) root.removeChild(toast) }, 3000)
  }

  const onSave = async ()=>{
    if(!name.trim()) return alert('Form adı gerekli')
    try{
      const res = await createForm({ name, schema: schema || [] })
      showToast('success','Kaydedildi',`Form ID: ${res.id}`)
      navigate(`/builder?id=${res.id}`)
    }catch(e){ alert('Kaydetme hatası: ' + e) }
  }

  const onUpdate = async ()=>{
    if(!id) return alert('Önce kaydedin')
    if(!name.trim()) return alert('Form adı gerekli')
    try{
      await updateForm(id, { name, schema: schema || [] })
      showToast('success','Güncellendi')
    }catch(e){ showToast('error','Güncelleme hatası', String(e)) }
  }

  const onPreview = ()=>{
    if(id) navigate(`/forms/${id}/fill`)
    else showToast('error','Önce formu kaydedin')
  }

  if(loading) return <div className="card">Form yükleniyor...</div>

  return (
    <div className="card">
      <h2 style={{marginTop:10}}>Form Oluştur / Düzenle</h2>
      <div style={{display:'grid', gap:12, gridTemplateColumns:'2fr 1fr'}}>
        <div>
          <label className="muted" style={{fontSize:12}}>Form Adı</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Yeni Form"/>
        </div>
        <div className="btn-group"  style={{display:'flex', gap:10, alignItems:'end', justifyContent:'flex-end' }}>
          <button className="btn" onClick={onSave}>Kaydet</button>
          <button className="btn" onClick={onUpdate} disabled={!id}>Güncelle</button>
          <button className="btn" onClick={onPreview}>Önizle</button>
        </div>
      </div>

      <div style={{marginTop:20}} className="builder-grid builder-surface">
        <ReactFormBuilder data={initialData} className="react-form-builder"/>
      </div>
      <p className="muted" style={{marginTop:8}}>Sürükle-bırak ile alanları ekleyin. Sağ panelden özellikleri düzenleyin.</p>
    </div>
  )
}
