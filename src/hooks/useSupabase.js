import { useState, useEffect, useCallback } from 'react'
import { supabase, isConfigured } from '../lib/supabase'

export function useTable(tableName, options = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { orderBy = 'display_order', ascending = true } = options

  const fetchData = useCallback(async () => {
    if (!isConfigured) { setLoading(false); return }
    setLoading(true)
    let query = supabase.from(tableName).select('*')
    if (orderBy) query = query.order(orderBy, { ascending })
    const { data: rows, error: err } = await query
    if (err) setError(err.message)
    else setData(rows || [])
    setLoading(false)
  }, [tableName, orderBy, ascending])

  useEffect(() => { fetchData() }, [fetchData])

  const add = async (item) => {
    if (!isConfigured) return new Error('Supabase no configurado')
    const { error: err } = await supabase.from(tableName).insert(item)
    if (!err) fetchData()
    return err
  }

  const update = async (id, updates) => {
    if (!isConfigured) return new Error('Supabase no configurado')
    const { error: err } = await supabase.from(tableName).update(updates).eq('id', id)
    if (!err) fetchData()
    return err
  }

  const remove = async (id) => {
    if (!isConfigured) return new Error('Supabase no configurado')
    const { error: err } = await supabase.from(tableName).delete().eq('id', id)
    if (!err) fetchData()
    return err
  }

  return { data, loading, error, add, update, remove, refresh: fetchData }
}

export function useConfig(section) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchConfig = useCallback(async () => {
    if (!isConfigured) { setLoading(false); return }
    const { data: row } = await supabase
      .from('site_config')
      .select('content')
      .eq('section', section)
      .single()
    setData(row?.content || null)
    setLoading(false)
  }, [section])

  useEffect(() => { fetchConfig() }, [fetchConfig])

  const save = async (content) => {
    if (!isConfigured) return new Error('Supabase no configurado')
    const { error } = await supabase
      .from('site_config')
      .upsert({ section, content }, { onConflict: 'section' })
    if (!error) setData(content)
    return error
  }

  return { data, loading, save, refresh: fetchConfig }
}
