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

    // Fetch REST API
    const [users, setUsers] = useState([])

  const fetchUserData = () => {
    fetch("http://localhost:3002/verification-requests")
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

  




