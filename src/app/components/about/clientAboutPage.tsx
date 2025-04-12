'use client'

import { useState } from 'react'

import Breadcrumbs from 'app/ui/breadcrumbs'
import { Us } from './us'
import { Team } from './team'
import { Review } from '../review'
import Modal from '../modal'
import ModalSuccess from '../modalSuccess'
import { Contacts } from '../home/contacts'
import { Info } from './info'
import { useGetContactsQuery } from 'app/api/contactsApi'

export function ClientAboutPage() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const { data: contacts = [] } = useGetContactsQuery()
  const firstContact = contacts[0]
  return (
    <>
      <Info />
      <Breadcrumbs />
      <Us setIsOpen={setIsOpenFormModal} />
      <Team />
      <Review btn />
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
