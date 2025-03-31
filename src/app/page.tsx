'use client'

import { useState } from 'react'
import Modal from './components/modal'
import ModalSuccess from './components/modalSuccess'
import { About } from './components/home/about'
import { Steps } from './components/home/steps'
import { Choice } from './components/home/choice'
import { Review } from './components/review'
import { Qestions } from './components/home/qestions'
import { Asnwer } from './components/asnwer'
import { Contacts } from './components/home/contacts'

export default function Home() {
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
