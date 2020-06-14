import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
    const [debounceValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce;