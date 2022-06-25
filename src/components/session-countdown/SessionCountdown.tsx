import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useStore } from '../../hooks/use-store'

const SessionCountdown = observer(() => {
  const { currentUser } = useStore().userStore
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (currentUser) {
      const findTimeLeft = () => {
        const now = Math.floor(Date.now() / 1000)
        const differ = currentUser.exp! - now

        setTimeLeft(differ)
      }

      findTimeLeft()

      const timerId = setInterval(findTimeLeft, 1000)

      return () => {
        clearInterval(timerId)
      }
    }
  }, [currentUser])

  return (
    <span>
      {timeLeft < 0
        ? 'Sess expired'
        : `${moment.duration(timeLeft, 'seconds').hours()}:${moment
            .duration(timeLeft, 'seconds')
            .minutes()}:${moment.duration(timeLeft, 'seconds').seconds()}`}
    </span>
  )
})

export default SessionCountdown
