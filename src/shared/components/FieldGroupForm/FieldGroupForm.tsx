import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FieldGroup } from '@/components/ui/field'
import { AlertCircleIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FieldGroupFormProps extends ComponentPropsWithoutRef<typeof FieldGroup> {
  errorMessage?: string,
  children?: ReactNode;
}

export function FieldGroupForm({errorMessage, children, ...props}: FieldGroupFormProps) {
  return (
    <FieldGroup {...props}>
      {getAlert(errorMessage)}
      {children}
    </FieldGroup>
  )
}

function getAlert(errorMessage?: string) {
  if (errorMessage) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertCircleIcon className='my-0.5'/>
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    );
  }

  return (<></>)
}