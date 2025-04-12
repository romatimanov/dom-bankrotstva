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
import { useGetContactsQuery } from 'app/api/contactsApi'

export function ClientPage() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const { data: contacts = [] } = useGetContactsQuery()
  const firstContact = contacts[0]

  return (
    <>
      <About setIsOpen={setIsOpenFormModal} />
      <Steps setIsOpen={setIsOpenFormModal} />
      <Choice setIsOpen={setIsOpenFormModal} />
      <Review />
      <Qestions />
      <Asnwer />

      {firstContact && <Contacts id="contacts" contacts={firstContact} />}

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
