import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Verified } from "lucide-react";

export const PostCard = () => {
  return (
    <div className="border rounded-md p-6 flex flex-row gap-6">
      <Avatar className="w-[40px] h-[40px]">
        <AvatarImage src="/avatar.jpeg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-3">
        <a href="/" className="flex items-center">
          <span>Mayuyu</span>
          <Verified size={22} fill="#6366f1" className="text-white" />
        </a>
        <div className="border rounded-lg flex flex-row">
          <img
            src="/header.jpg"
            alt=""
            className="w-[80px] h-[100px] rounded-md object-cover"
          />
          <div className="px-4 py-3 flex flex-col justify-center gap-2">
            <p className="small">Jujutsu Kaisen</p>
            <p className="subtle text-slate-500">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibu
        </p>
      </div>
    </div>
  );
};
