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

export function TableReport() {

    // Fetch REST API
    const [users, setUsers] = useState([])
  
    const fetchUserData = () => {
      fetch("http://localhost:3002/report")
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