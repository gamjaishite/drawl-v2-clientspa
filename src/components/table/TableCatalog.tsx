import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { ButtonIconCheck, ButtonIconCross } from "../buttons/Icon";
  import React, { useRef, useState, useEffect } from 'react'
  import { Check, X } from 'lucide-react';

  import { Button } from "@/components/ui/button"

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
  
    // Fetch REST API
    const [users, setUsers] = useState([])
  
    const fetchUserData = () => {
      fetch("http://localhost:3002/catalog")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUsers(data)
        })
    }
  
    useEffect(() => {
      fetchUserData()
    }, [])
  
  
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