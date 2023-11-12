import {PostCard} from '@/components/card/PostCard'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {ProfileError} from './ProfileError'
import {ProfileData} from '@/types'
import {ProfileHeader} from './ProfileHeader'

const Profile = () => {
  const {username} = useParams()
  const [profile, setProfile] = useState<ProfileData | undefined>()
  const [error, setError] = useState<string | undefined>()
  console.log(username)
  async function getProfile(username: string) {
    const result = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/profile/${username}`,
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
    getProfile(username ?? '')
  }, [username])

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
