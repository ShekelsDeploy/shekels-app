// Ejemplo de usar el redux ya configurado
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAccountData } from './accountSlice'

export function Counter() {
  const count = useSelector((state:any) => state.accountData.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Set hola"
          onClick={() => dispatch(setAccountData('hola'))}
        >
          Set hola
        </button>
        <span>{count}</span>
      </div>
    </div>
  )
}