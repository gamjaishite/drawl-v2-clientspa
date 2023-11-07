import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Flag, Settings, Verified } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/types";
import { EditProfileForm } from "./EditProfileForm";

interface ProfileHeaderProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  isOwner?: boolean;
}

export const ProfileHeader = ({
  profile,
  isOwner = false,
  setProfile,
}: ProfileHeaderProps) => {
  return (
    <div className="border rounded-md">
      <img
        src={
          profile.cover
            ? `${import.meta.env.VITE_PUBLIC_URL}/${profile.cover}`
            : "/header.jpg"
        }
        alt="User tes header"
        className="w-full h-[160px] md:h-[240px] rounded-md object-cover"
      />
      <div className="flex flex-row justify-between items-center mx-4 md:mx-10">
        <Avatar className="w-[100px] md:w-[160px] h-[100px] md:h-[160px] border-4 border-background -mt-10 md:-mt-20">
          <AvatarImage
            src={
              profile.avatar
                ? `${import.meta.env.VITE_PUBLIC_URL}/${profile.avatar}`
                : "/avatar.jpeg"
            }
            className="w-full h-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-row gap-2 items-center">
          {!isOwner ? (
            <>
              <Dialog>
                <DialogTrigger>
                  <Button variant={"ghost"} size={"icon"}>
                    <Flag />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100vw-4rem)] sm:max-w-[425px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-start">
                      Report {profile.username}?
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-start subtle">
                    Our team will review this profile and take appropriate
                    action.
                  </p>
                  <Label htmlFor="comment">Comments</Label>
                  <Textarea
                    id="comment"
                    placeholder="Enter your comment here"
                  />
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button>Follow</Button>
            </>
          ) : (
            <>
              <Dialog>
                <DialogTrigger>
                  <Button variant={"ghost"} size={"icon"}>
                    <Settings />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100vw-4rem)] md:max-w-[600px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-start">
                      Edit Profile
                    </DialogTitle>
                  </DialogHeader>
                  <EditProfileForm profile={profile} setProfile={setProfile} />
                </DialogContent>
              </Dialog>
              {!profile.verified && (
                <Button className="bg-gradient-to-r from-indigo-500 to-black hover:from-10% transition-all duration-500 ease-in-out border border-purple-400 text-white">
                  Drawl Purple
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="min-h-[100px] mx-4 md:mx-10 my-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="large">{profile.username}</p>
          <Verified className="text-indigo-500" />
        </div>
        <p className="mt-2.5 mb-4 min-h-[50px] w-full break-words">
          {profile.bio}
        </p>
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
  );
};
