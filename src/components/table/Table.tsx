import {
    Table,
    TableBody,
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

  
   
  export function TableUser() {
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
                <a href={user.user_link} target="_blank" rel="noopener noreferrer">
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

  const catalog_data = [
    {
      catalog_id: "1",
      title: "jujutsu kaisen",
      description: "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018",
      buttons: button_collection,
      catalog_link: "https://en.wikipedia.org/wiki/Jujutsu_Kaisen",
    },
    {
      catalog_id: "2",
      title: "demon slayer",
      description: "Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It was serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump",
      buttons: button_collection,
      catalog_link: "https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba",
    },
  ]

export function TableCatalog() {
  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID Catalog</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Accept/Deny</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalog_data.map((catalog) => (
            <TableRow key={catalog.catalog_id}>
              <TableCell className="font-medium">{catalog.catalog_id}</TableCell>
              <TableCell>
                <a href={catalog.catalog_id} target="_blank" rel="noopener noreferrer">
                {catalog.title}
                </a>
                </TableCell>
              <TableCell>{catalog.description}</TableCell>
              <TableCell className="text-right">{catalog.buttons}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}  

const report_data = [
  {
    username: "breezy",
    email: "x1@gmail.com",
    report_description: "xxx",
    buttons: button_collection,
    user_link: "https://lucide.dev/icons/x",
  },
  {
    username: "breezy232",
    email: "x2@gmail.com",
    report_description: "xxx",
    buttons: button_collection,
    user_link: "https://lucide.dev/icons/x",
  },
 
]

export function TableReport() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Report Description</TableHead>
          <TableHead className="text-right">Accept/Deny</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {report_data.map((report) => (
          <TableRow key={report.email}>
            <TableCell className="font-medium">
              <a href={report.user_link} target="_blank" rel="noopener noreferrer">
              {report.username}
              </a>
            </TableCell>
            <TableCell>
              {report.email}
              </TableCell>
            <TableCell>{report.report_description}</TableCell>
            <TableCell className="text-right">{report.buttons}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}