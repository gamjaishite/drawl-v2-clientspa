import {PostCard} from '@/components/card/PostCard'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {ProfileError} from './ProfileError'
import {ProfileData} from '@/types'
import {ProfileHeader} from './ProfileHeader'
import {useCookies} from 'react-cookie'
import {useAuth} from '@/hooks'

const Profile = () => {
  let {id} = useParams()
  const {user} = useAuth()
  const [profile, setProfile] = useState<ProfileData | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [cookies] = useCookies(['suka_nyabun'])

  if (!id) {
    id = user?.id
  }

  console.log(id)
  async function getProfile(id: string, token: string) {
    const result = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/profile/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (result.ok) {
      const profile = await result.json()
      console.log(profile.data)
      setProfile(profile.data)
    } else {
      const error = await result.json()
      toast.error(error.message)
      setError(error.message)
      setProfile(undefined)
    }
  }

  useEffect(() => {
    getProfile(id ?? '', cookies.suka_nyabun ?? '')
  }, [id, cookies.suka_nyabun])

  useEffect(() => {
    console.log(profile)
  }, [profile])

  if (!profile) {
    return <ProfileError error={error} />
  }

  return (
    <>
      <ProfileHeader profile={profile} setProfile={setProfile} />
      <h4 className="my-6">Posts</h4>
      <div className="flex flex-col gap-6">
        <PostCard />

        <PostCard />
      </div>
    </>
  )
}

export default Profile
