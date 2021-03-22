import { useState, useEffect } from 'react';
import useInterval from './useInterval';

function useFetcher(actions, interval = null) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const actionsIsArray = Array.isArray(actions)

  async function loadData() {
    try {
      let actionData 
      if (actionsIsArray) {
        actionData = await Promise.all(actions.map(async ({ action, params }) => await action(params)))
      } else {
        actionData = await actions.action(actions.params)
      }
      console.debug(`actionData is ${actionData}` );
      setData(actionData)
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  
  const actionParams = actionsIsArray ? actions.map(action => action.params) : [actions.params]
  useEffect(() => {
    setLoading(true)
    loadData()
  }, actionParams)
  
  // call actions on a timer if interval is provided
  useInterval(loadData, interval)

  return [data, loading, error]
}

export default useFetcher