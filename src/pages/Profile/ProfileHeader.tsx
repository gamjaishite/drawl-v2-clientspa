import {Avatar} from '@/components/ui/avatar'
import {Button, buttonVariants} from '@/components/ui/button'
import {AvatarFallback, AvatarImage} from '@radix-ui/react-avatar'
import {Flag, Settings, Verified} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {ProfileData} from '@/types'
import {EditProfileForm} from './EditProfileForm'
import {useCookies} from 'react-cookie'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {useAuth} from '@/hooks'
import {cn} from '@/lib/utils'
import {useNavigate} from 'react-router-dom'
import {ReportUserForm} from './ReportUserForm'

interface ProfileHeaderProps {
  profile: ProfileData
  setProfile: (profile: ProfileData) => void
  isOwner?: boolean
}

export const ProfileHeader = ({profile, setProfile}: ProfileHeaderProps) => {
  const {user, loading} = useAuth()
  const [cookies] = useCookies(['suka_nyabun'])
  const [postLoading, setPostLoading] = useState(false)
  const navigate = useNavigate()

  const handleVerificationRequest = async () => {
    console.log('Verification request')
    try {
      setPostLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/verification-request`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
          },
          credentials: 'include',
        },
      )

      const resData = await res.json()
      console.log(resData)
      if (!res.ok || resData.status !== 200) {
        toast.error(resData.message)
        return
      }

      toast.success(resData.message)
    } catch (e) {
      console.log(e)
    } finally {
      setPostLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    try {
      setPostLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/user-follow`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            followingId: profile.id,
          }),
        },
      )

      const resData = await res.json()
      console.log(resData)
      if (!res.ok || resData.status !== 200) {
        toast.error(resData.message)
        return
      }

      toast.success(resData.message)
      setProfile({
        ...profile,
        followingId: resData.data.id,
        followerCount: profile.followerCount + 1,
      })
      console.log(resData.data.id)
    } catch (e) {
      console.log(e)
    } finally {
      setPostLoading(false)
    }
  }

  const handleUnfollow = async () => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    try {
      setPostLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/user-follow/${
          profile.followingId
        }`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${cookies.suka_nyabun}`,
          },
          credentials: 'include',
        },
      )

      const resData = await res.json()
      console.log(resData)
      if (!res.ok || resData.status !== 200) {
        toast.error(resData.message)
        return
      }

      toast.success(resData.message)
      setProfile({
        ...profile,
        followingId: null,
        followerCount: profile.followerCount - 1,
      })
    } catch (e) {
      console.log(e)
    } finally {
      setPostLoading(false)
    }
  }

  return (
    <div className="border rounded-md">
      <img
        src={
          profile.cover
            ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${profile.cover}`
            : '/header.jpg'
        }
        alt="User tes header"
        className="w-full h-[160px] md:h-[240px] rounded-md object-cover"
      />
      <div className="flex flex-row justify-between items-center mx-4 md:mx-10">
        <Avatar className="bg-purple-500 w-[100px] md:w-[160px] h-[100px] md:h-[160px] border-4 border-background -mt-10 md:-mt-20">
          <AvatarImage
            src={
              profile.avatar
                ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${profile.avatar}`
                : '/avatar.jpeg'
            }
            className="w-full h-full object-cover"
          />
          <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-row gap-2 items-center">
          {loading || postLoading ? (
            <></>
          ) : (
            <>
              {user?.id !== profile.id ? (
                <>
                  {profile.role !== 'ADMIN' &&
                    (user ? (
                      <Dialog>
                        <DialogTrigger>
                          <Flag />
                        </DialogTrigger>
                        <DialogContent className="w-[calc(100vw-4rem)] sm:max-w-[425px] rounded-lg">
                          <DialogHeader>
                            <DialogTitle className="text-start">
                              Report {profile.username}?
                            </DialogTitle>
                          </DialogHeader>
                          <ReportUserForm reportedId={profile.id} />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        variant={'ghost'}
                        onClick={() => {
                          navigate('/auth/login')
                        }}
                      >
                        <Flag />
                      </Button>
                    ))}
                  <Button onClick={profile.followingId ? handleUnfollow : handleFollow}>
                    {profile.followingId ? 'Unfollow' : 'Follow'}
                  </Button>
                </>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <Settings />
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-4rem)] md:max-w-[600px] rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="text-start">Edit Profile</DialogTitle>
                      </DialogHeader>
                      <EditProfileForm profile={profile} setProfile={setProfile} />
                    </DialogContent>
                  </Dialog>
                  {!profile.verified && profile.role !== 'ADMIN' && (
                    <Dialog>
                      <DialogTrigger
                        className={cn(
                          buttonVariants(),
                          'bg-gradient-to-r from-indigo-500 to-black hover:from-10% transition-all duration-500 ease-in-out border border-purple-400 text-white',
                        )}
                      >
                        Drawl Purple
                      </DialogTrigger>
                      <DialogContent className="w-[calc(100vw-4rem)] md:max-w-[600px] rounded-lg">
                        <DialogHeader>
                          <DialogTitle className="text-start">Drawl Purple</DialogTitle>
                        </DialogHeader>
                        <div>
                          <img
                            src="/verification-request-header.jpeg"
                            alt="verification request header"
                            className="w-full h-[120px] md:h-[160px] rounded-md object-cover mb-4 md:mb-10"
                          />
                          Requesting verification brings a bundle of benefits:
                          <ol className="list-decimal ml-8 my-4">
                            <li>
                              Extended Post Limit: Express more with a longer character
                              limit for your posts.
                            </li>
                            <li>
                              Customize Your Profile: Stand out by adding a custom profile
                              picture and header.
                            </li>
                            <li>
                              Access Catalog Requests: Explore exclusive features and
                              opportunities. 🚀
                            </li>
                          </ol>
                          Click below to request verification!
                        </div>
                        <DialogFooter>
                          <Button
                            disabled={postLoading}
                            onClick={handleVerificationRequest}
                            className="w-full bg-gradient-to-r from-indigo-500 to-black hover:from-10% transition-all duration-500 ease-in-out border border-purple-400 text-white"
                          >
                            Yes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="min-h-[100px] mx-4 md:mx-10 my-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="large">@{profile.username}</p>
          {profile.role === 'ADMIN' && <Verified fill={'#fbbf24'} />}
          {profile.role !== 'ADMIN' && profile.verified && <Verified />}
        </div>
        <p className="mt-2.5 mb-4 min-h-[50px] w-full break-words">{profile.bio}</p>
        <div className="flex flex-row items-center gap-4">
          <div className="flex gap-2 items-center">
            <p className="large">{profile.followerCount}</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="large">{profile.followingCount}</p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </div>
    </div>
  )
}
