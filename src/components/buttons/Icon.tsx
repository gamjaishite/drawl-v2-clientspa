import { Check, X } from 'lucide-react';

import { Button } from "@/components/ui/button"

export function ButtonIconCheck(props: any) {
  return (
    <Button variant="outline" size="icon" onClick={props.onclick}>
      <Check className="h-4 w-4" />
    </Button>
  )
}

export function ButtonIconCross(props: any) {
    return (
        <Button variant="outline" size="icon" onClick={props.onclick}>
          <X className="h-4 w-4" />
        </Button>
      )
}

