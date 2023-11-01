import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { ButtonIconCheck, ButtonIconCross } from "../buttons/Icon";

const button_collection = (
  <div>
    <ButtonIconCheck />
    <ButtonIconCross />
  </div>
  
);
   
  const user_data = [
    {
      user_id: "1",
      username: "breezy",
      email: "x1@gmail.com",
      buttons: button_collection,
      user_link: "https://lucide.dev/icons/x",
    },
    {
      user_id: "2",
      username: "breezy232",
      email: "x2@gmail.com",
      buttons: button_collection,
      user_link: "https://lucide.dev/icons/x",
    },
   
  ]
   
  export function TableDemo() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID User</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Accept/Deny</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user_data.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell className="font-medium">{user.user_id}</TableCell>
              <TableCell>
                <a href={user.user_link}>
                {user.username}
                </a>
                </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{user.buttons}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  