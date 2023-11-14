import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { ButtonIconCheck, ButtonIconCross } from "../buttons/Icon";
  import React, { useRef, useState } from 'react'
  import { Check, X } from 'lucide-react';

  import { Button } from "@/components/ui/button"


// const button_collection = (
//   <div>
//     <ButtonIconCheck  />
//     <ButtonIconCross />
//   </div>
  
// );
   
  

  
   
  export function TableUser() {
    const user_data = [
      {
        user_id: 1,
        username: "breezy",
        email: "x1@gmail.com",
        user_link: "https://lucide.dev/icons/x",
      },
      {
        user_id: 2,
        username: "breezy232",
        email: "x2@gmail.com",
        user_link: "https://lucide.dev/icons/x",
      },
     
    ]

    const [lists, setList] = useState(user_data)
    const [count, setCount] = useState(3)
    const [updateState, setUpdateState] = useState(-1)

    function handleAccept(id: any, e: any) {
      e.preventDefault();
      setCount(count + 1);
      const newUsers = lists.concat([{
        user_id: count,
        username: "breezy232",
        email: "x2@gmail.com",
        user_link: "https://lucide.dev/icons/x",
      }])
      setList(newUsers);
    }

    function handleReject(id: any, e: any) {
      e.preventDefault();
      setList(lists => lists.filter((li) => li.user_id !== id));
    }


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
          {lists.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell className="font-medium">{user.user_id}</TableCell>
              <TableCell>
                <a href={user.user_link} target="_blank" rel="noopener noreferrer">
                {user.username}
                </a>
                </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">
                <div>
                  <Button variant="outline" size="icon" onClick={(e) => handleAccept(user.user_id, e)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={(e) => handleReject(user.user_id, e)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    )
  }

  
export function TableCatalog() {

  const catalog_data = [
    {
      catalog_id: 1,
      title: "jujutsu kaisen",
      description: "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018",
      catalog_link: "https://en.wikipedia.org/wiki/Jujutsu_Kaisen",
    },
    {
      catalog_id: 2,
      title: "demon slayer",
      description: "Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It was serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump",
      catalog_link: "https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba",
    },
  ]


  const [lists, setList] = useState(catalog_data)
    const [count, setCount] = useState(3)
    const [updateState, setUpdateState] = useState(-1)

    function handleAccept(id: any) {
      setCount(count + 1);
      const newlist = lists.concat({
        catalog_id: count,
        title: "breezy232",
        description: "x2@gmail.com",
        catalog_link: "https://lucide.dev/icons/x",
      })
      setList(newlist)
    }

    function handleReject(id: any) {
      const newlist = lists.filter((li) => li.catalog_id !== id)
      setList(newlist)
    }

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
          {lists.map((catalog) => (
            <TableRow key={catalog.catalog_id}>
              <TableCell className="font-medium">{catalog.catalog_id}</TableCell>
              <TableCell>
                <a href={catalog.catalog_link} target="_blank" rel="noopener noreferrer">
                {catalog.title}
                </a>
                </TableCell>
              <TableCell>{catalog.description}</TableCell>
              <TableCell className="text-right">
              <div>
                  <Button variant="outline" size="icon" onClick={() => handleAccept(catalog.catalog_id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleReject(catalog.catalog_id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}  



export function TableReport() {

  const report_data = [
    {
      username: "breezy",
      email: "x1@gmail.com",
      report_description: "xxx",
      user_link: "https://lucide.dev/icons/x",
    },
    {
      username: "breezy232",
      email: "x2@gmail.com",
      report_description: "xxx",
      user_link: "https://lucide.dev/icons/x",
    },
   
  ]

  const [lists, setList] = useState(report_data)
    const [count, setCount] = useState(2)
    const [updateState, setUpdateState] = useState(-1)

    function handleAccept(email: any) {
      setCount(count + 1);
      const newlist = lists.concat({
        username: "breezy232",
        email: "x"+ count + "@gmail.com",
        report_description: "xxx",
        user_link: "https://lucide.dev/icons/x",
      })
      setList(newlist)
    }

    function handleReject(email: any) {
      const newlist = lists.filter((li) => li.email !== email)
      setList(newlist)
    }

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
        {lists.map((report) => (
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
            <TableCell className="text-right">
            <div>
                  <Button variant="outline" size="icon" onClick={() => handleAccept(report.email)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleReject(report.email)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}