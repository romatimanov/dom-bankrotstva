'use client'

import { Info } from 'app/components/about/info'
import { Team } from 'app/components/about/team'
import { Us } from 'app/components/about/us'
import { Contacts } from 'app/components/home/contacts'
import Modal from 'app/components/modal'
import ModalSuccess from 'app/components/modalSuccess'
import { Review } from 'app/components/review'
import Breadcrumbs from 'app/ui/breadcrumbs'
import { useState } from 'react'

export default function About() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  return (
    <>
      <Info />
      <Breadcrumbs />
      <Us setIsOpen={setIsOpenFormModal} />
      <Team />
      <Review btn />
      <Contacts />
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
