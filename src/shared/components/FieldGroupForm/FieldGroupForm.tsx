import { Alert, AlertTitle } from '@/components/ui/alert'
import { FieldGroup } from '@/components/ui/field'
import { AlertCircleIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FieldGroupFormProps extends ComponentPropsWithoutRef<typeof FieldGroup> {
  errorMessage?: string,
  children?: ReactNode;
}

export function FieldGroupForm({errorMessage, children, ...props}: FieldGroupFormProps) {
  return (
    <>
      {getAlert(errorMessage)}
      <FieldGroup {...props}>
        {children}
      </FieldGroup>
    </>
  )
}

function getAlert(errorMessage?: string) {
  if (errorMessage) {
    return (
      <Alert variant="destructive" className="w-full mb-2">
        <AlertCircleIcon/>
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    );
  }

  return (<></>)
}