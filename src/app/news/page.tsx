'use client'

import Modal from 'app/components/modal'
import ModalSuccess from 'app/components/modalSuccess'
import { Articles } from 'app/components/news/articles'
import { Info } from 'app/components/news/info'
import Breadcrumbs from 'app/ui/breadcrumbs'
import { useState } from 'react'

export default function News() {
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
