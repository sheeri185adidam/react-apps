import { useSelector } from "react-redux"
import { selectPusherApp } from "./pusherSlice"

export const PusherAppSubscription = () => {
    const pusherApp = useSelector(selectPusherApp)
  
    return (
      <section>
        <h5>Subscribed App:</h5>
        <label>App Key: {pusherApp.appKey}</label>
        <label>App Cluster: {pusherApp.appCluster}</label>
      </section>
    )
  }