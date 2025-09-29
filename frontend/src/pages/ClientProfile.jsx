import React from 'react'
import { useParams } from 'react-router-dom'

const ClientProfile = () => {
  const {id} = useParams()

  return (
    <div>ClientProfile</div>
  )
}

export default ClientProfile