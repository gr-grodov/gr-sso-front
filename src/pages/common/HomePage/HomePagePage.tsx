import { oauth2FlowContinue } from '@/features/oauth2/oauth2-flow-continue';
import { UserInformationBlock } from '@/shared/widgets/UserInformationBlock'
import React, { useEffect } from 'react'

export function HomePage() {

  useEffect(() => {
    async function continueOAuth2() {
      await oauth2FlowContinue(() => {});  
    }
    
    continueOAuth2();
  }, [])

  return (
    <>
      <UserInformationBlock/>
    </>
  )
}
