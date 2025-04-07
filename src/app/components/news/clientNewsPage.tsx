'use client'

import Breadcrumbs from 'app/ui/breadcrumbs'

import { Articles } from './articles'
import Modal from '../modal'
import ModalSuccess from '../modalSuccess'
import { useState } from 'react'
import { Info } from './info'

export function ClientNewsPage() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  return (
    <>
      <Info />
      <Breadcrumbs />
      <Articles setIsOpen={setIsOpenFormModal} />
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
