import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addApp } from './pusherSlice'

export const PusherApp = () => {
  const [appKey, setAppKey] = useState('')
  const [appCluster, setAppCluster] = useState('')

  const dispatch = useDispatch()

  const onAppKeyChanged = (e) => setAppKey(e.target.value)
  const onAppClusterChanged = (e) => setAppCluster(e.target.value)

  const onAddApp = () => {
    if (appKey && appCluster) {
      dispatch(
        addApp({
          appKey,
          appCluster,
        })
      )
    }
  }

  const canAddApp =
    Boolean(appKey) &&
    Boolean(appCluster)

  return (
    <section>
      <form>
        <label htmlFor="appKey">AppKey:</label>
        <input
          type="text"
          id="appKey"
          name="appKey"
          value={appKey}
          placeholder="Pusher App Key"
          onChange={onAppKeyChanged}
        />
        <label htmlFor="appCluster">AppCluster:</label>
        <input
          type="text"
          id="appCluster"
          name="appCluster"
          value={appCluster}
          placeholder="Pusher App Cluster"
          onChange={onAppClusterChanged}
        />
        <button type="button" onClick={onAddApp} disabled={!canAddApp}>
          {'Add App'}
        </button>
      </form>
    </section>
  );
}
