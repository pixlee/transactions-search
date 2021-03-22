import React  from 'react'
import useFetcher from '../hooks/useFetcher'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Fetch = ({ actions, interval, children }) => {
  const [data, loading, error] = useFetcher(actions, interval)
  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data || (Array.isArray(actions) && data.length === 0)) return null
  return children(data)
}

export default Fetch
