import { useEffect } from "react"

import { checkSession } from "../api/auth.js"

function useRestoreSession(setUser) {
  useEffect(() => {
    checkSession()
      .then((res) => {
        setUser({ id: res.id, username: res.username })
      })
      .catch((err) => {
        setUser({ id: undefined, username: undefined })
      })
  }, [setUser])
}

export default useRestoreSession