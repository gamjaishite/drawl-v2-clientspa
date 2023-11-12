import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileData } from "@/types";

const MAX_FILE_SIZE = 1_000_000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const editProfileFormSchema = z.object({
  username: z
    .string({
      required_error: "User username is required",
      invalid_type_error: "User username is not in a valid type",
    })
    .trim()
    .min(1, {
      message: "User username is required",
    })
    .max(36, {
      message: "User username is too long, maximum 36 characters",
    }),
  bio: z
    .string({
      invalid_type_error: "User username is not in a valid type",
    })
    .optional(),
  files: z.object({
    avatar: z
      .any()
      .refine((file) => {
        if (file) return file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`;
        return true;
      })
      .refine((file) => {
        if (file) return ACCEPTED_IMAGE_TYPES.includes(file?.type);
        return true;
      }, ".jpg, .jpeg, .png and .webp file are accepted.")
      .nullable(),
    cover: z
      .any()
      .refine((file) => {
        if (file) return file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`;
        return true;
      })
      .refine((file) => {
        if (file) return ACCEPTED_IMAGE_TYPES.includes(file?.type);
        return true;
      }, ".jpg, .jpeg, .png and .webp file are accepted.")
      .nullable(),
  }),
});

export const EditProfileForm = ({
  profile,
  setProfile,
}: {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}) => {
  const [avatar, setAvatar] = useState<string | undefined | null>(
    profile.avatar
      ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${profile.avatar}`
      : null
  );
  const [cover, setCover] = useState<string | undefined | null>(
    profile.cover ? `${import.meta.env.VITE_REST_SERVICE_PUBLIC_URL}/${profile.cover}` : null
  );
  const avatarInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const editProfileForm = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      username: profile.username,
      bio: profile.bio ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    console.log(values);
    const formData = new FormData();

    if (values.files.avatar) {
      formData.append("avatar", values.files.avatar);
    }

    if (values.files.cover) {
      formData.append("cover", values.files.cover);
    }

    formData.append("username", values.username);
    formData.append("bio", values.bio ?? "");
    console.log(formData.get("avatar"));
    const result = await fetch(
      `${import.meta.env.VITE_REST_SERVICE_BASE_URL}/profile/${profile.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (result.ok) {
      const profile = await result.json();
      console.log(profile.data);
      setProfile({
        ...profile.data,
      });
      toast.success("Profile updated");
    } else {
      const error = await result.json();
      toast.error(error.message);
    }
  }

  function handleClick(type: "avatar" | "cover") {
    if (type === "avatar") {
      avatarInput.current?.click();
    } else if (type === "cover") {
      coverInput.current?.click();
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover"
  ) {
    if (e.currentTarget.files) {
      const fileUploaded = e.currentTarget.files[0];
      const url = URL.createObjectURL(fileUploaded);
      if (type === "avatar") {
        setAvatar(url);
        editProfileForm.setValue("files.avatar", fileUploaded);
      } else if (type === "cover") {
        setCover(url);
        editProfileForm.setValue("files.cover", fileUploaded);
      }
    }
  }

  return (
    <Form {...editProfileForm}>
      <form
        onSubmit={editProfileForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="border rounded-md">
          <FormField
            control={editProfileForm.control}
            name="files.cover"
            render={() => (
              <FormItem>
                <FormControl>
                  <div>
                    <button
                      type="button"
                      className="relative w-full"
                      onClick={() => handleClick("cover")}
                    >
                      <div className="absolute w-full h-[160px] flex justify-center items-center top-0 -z-50 hover:z-50">
                        <h4 className="text-center">
                          UNLOCK
                          <br />
                          BANNER
                        </h4>
                      </div>
                      <img
                        src={cover ?? "/header.jpg"}
                        alt="User tes header"
                        className="w-full h-[160px] rounded-md object-cover hover:cursor-pointer hover:opacity-50 transition-all duration-500 ease-in-out"
                      />
                    </button>
                    <Input
                      ref={coverInput}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleChange(e, "cover")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editProfileForm.control}
            name="files.avatar"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row justify-between items-center mx-4">
                    <button
                      type="button"
                      className="relative w-full"
                      onClick={() => handleClick("avatar")}
                    >
                      <div className="absolute flex justify-center items-center top-0 -z-50 hover:z-50 w-[100px] h-[100px] border-4 border-background -mt-10">
                        <h4 className="text-xs text-center">
                          UNLOCK
                          <br />
                          AVATAR
                        </h4>
                      </div>
                      <Avatar className="w-[100px] h-[100px] border-4 border-background -mt-10 hover:opacity-50 transition-all duration-500 ease-in-out">
                        <AvatarImage
                          src={avatar ?? "/header.jpeg"}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </button>
                    <Input
                      ref={avatarInput}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleChange(e, "avatar")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="min-h-[100px] mx-4 my-4">
            <FormField
              control={editProfileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your comment here"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};