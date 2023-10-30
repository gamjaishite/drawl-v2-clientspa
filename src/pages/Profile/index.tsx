import { PostCard } from "@/components/card/PostCard";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Flag, Verified } from "lucide-react";

const Profile = () => {
  const auth = useAuth();
  //   const [count, setCount] = useState(0);

  return (
    <>
      <div className="border rounded-md">
        <img
          src="/header.jpg"
          alt="User tes header"
          className="w-full h-[240px] rounded-md object-cover"
        />
        <div className="flex flex-col md:flex-row justify-between items-center mx-10">
          <Avatar className="w-[160px] h-[160px] border-4 border-background -mt-20">
            <AvatarImage src="/avatar.jpeg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-row gap-2 items-center">
            <Button variant={"ghost"} size={"icon"}>
              <Flag />
            </Button>
            <Button>Follow</Button>
          </div>
        </div>
        <div className="min-h-[100px] px-10 my-6">
          <div className="flex flex-row gap-2 items-center">
            <p className="large">{auth.user?.name}</p>
            <Verified />
          </div>
          <p className="mt-2.5">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibu
          </p>
        </div>
      </div>

      <h4 className="my-6">Posts</h4>
      <div className="flex flex-col gap-6">
        <PostCard />

        <PostCard />
      </div>
    </>
  );
};

export default Profile;
