import { useState, useEffect } from 'react'

function useCurrencyInfo(baseCurrency) {
  const [currencyInfo, setCurrencyInfo] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`)
        }
        const data = await response.json()
        setCurrencyInfo(data.rates)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchCurrencyInfo()
  }, [baseCurrency])

  return { currencyInfo, error }
}

export default useCurrencyInfo
