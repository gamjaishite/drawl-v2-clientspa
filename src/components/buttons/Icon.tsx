import { Check, X } from 'lucide-react';

import { Button } from "@/components/ui/button"

export function ButtonIconCheck() {
  return (
    <Button variant="outline" size="icon">
      <Check className="h-4 w-4" />
    </Button>
  )
}

export function ButtonIconCross() {
    return (
        <Button variant="outline" size="icon">
          <X className="h-4 w-4" />
        </Button>
      )
}

