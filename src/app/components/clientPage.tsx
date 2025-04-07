'use client'

import { useState } from 'react'
import { Steps } from './home/steps'
import { Choice } from './home/choice'
import { Review } from './review'
import { Qestions } from './home/qestions'
import { Asnwer } from './asnwer'
import Modal from './modal'
import ModalSuccess from './modalSuccess'
import { About } from './home/about'
import { Contacts } from './home/contacts'

export function ClientPage() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  return (
    <>
      <About setIsOpen={setIsOpenFormModal} />
      <Steps setIsOpen={setIsOpenFormModal} />
      <Choice setIsOpen={setIsOpenFormModal} />
      <Review />
      <Qestions />
      <Asnwer />
      <Contacts id="contacts" />

      <Modal
        isOpen={isOpenFormModal}
        onClose={() => setIsOpenFormModal(false)}
        onSuccess={() => {
          setIsOpenFormModal(false)
          setIsOpenSuccessModal(true)
        }}
      />

      <ModalSuccess isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)} />
    </>
  )
}
