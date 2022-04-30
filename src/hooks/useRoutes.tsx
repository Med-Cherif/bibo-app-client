import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

interface Routes {
    prevRoute: null | string;
    currentRoute: null | string;
}

const useRoutes = () => {
    const location = useLocation()
    const [routes, setRoutes] = useState<Routes>({
        prevRoute: null,
        currentRoute: location.pathname
    })

    useEffect(() => {
        setRoutes(prevRoutes => ({
            prevRoute: prevRoutes.currentRoute,
            currentRoute: location.pathname
        }))
    }, [location.pathname])

    const { prevRoute, currentRoute } = routes
    return { prevRoute, currentRoute }
}

export default useRoutes
