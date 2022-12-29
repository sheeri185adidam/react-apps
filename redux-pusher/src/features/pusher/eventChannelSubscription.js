import { useSelector } from "react-redux"
import { selectChannel } from "./eventsSlice"

export const EventChannelSubscription = () => {
    const channel = useSelector(selectChannel);

    let channelName = ""
    if (channel) {
        channelName = `${channel}`
    }

    return (
        <section>
        <div>
            <i>Subscribed Channel: {channelName}</i>
        </div>
        </section>
    );
}