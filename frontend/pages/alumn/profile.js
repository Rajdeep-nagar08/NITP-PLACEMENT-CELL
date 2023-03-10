import Layout from '@/components/alumni/Layout'
import { useContext } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import AlumniRegistration from '@/components/alumni/profile/alumniRegistration'
import Profile from '@/components/alumni/profile/profile'
import { parseCookies } from '@/helpers/index'

export default function profile({ data = '', statusCode = '', token = '' }) {
  return (
    <Layout heading='Profile' >
      {statusCode === 204 ? (
        <AlumniRegistration token={token} />
      ) : (
        <Profile alumn={data} token={token} />
      )}
    </Layout>  
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const res = await axios.get(`${API_URL}/api/alumn/me`, config)
  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
