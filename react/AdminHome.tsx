/* eslint-disable no-console */
import type { FunctionComponent } from 'react'
import React, { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Layout,
  PageHeader,
  Button,
  PageBlock,
  Progress,
  ModalDialog,
  IconFailure,
  IconSuccess,
  ToastProvider,
  withToast,
  Input,
  Textarea,
  Dropdown,
  Switch,
} from 'vtex.styleguide'

import type { SeedResponse } from './typings/seed'

import './styles.global.css'

interface SelectBoxGroup {
  label: string
  value: string
}

interface AdminHomeProps {
  showToast: any
}

interface SeedStatus {
  error: any
  result: SeedResponse | null
}

const industryOptions: SelectBoxGroup[] = [
  { label: "Apparel & Acessories", value: "apparel-and-acessories" },
  { label: "Beauty & Health", value: "beauty-and-health" },
  { label: "Books & Education", value: "books-and-education" },
  { label: "Cars & Autoparts", value: "cars-and-autoparts" },
  { label: "Department Stores", value: "department-stores" },
  { label: "Eletronics & Mobiles", value: "eletronics-and-mobiles" },
  { label: "Foods & Beverages", value: "foods-and-beverages" },
  { label: "Grocery", value: "grocery" },
  { label: "Home Appliances", value: "home-appliances" },
  { label: "Home, Furniture & Decoration", value: "home-Furniture-and-decoration" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Others", value: "others" },
  { label: "Pet Shop", value: "pet-shop" },
  { label: "Sports & Fitness", value: "sports-fitness" },
  { label: "Toys & Hobbies", value: "toys-hobbies" },
]

const languageOptions: SelectBoxGroup[] = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'English (Australia)', value: 'en-AU' },
  { label: 'English (Canada)', value: 'en-CA' },
  { label: 'Portuguese (Portugal)', value: 'pt-PT' },
  { label: 'Portuguese (Brazil)', value: 'pt-BR' },
  { label: 'Spanish (Mexico)', value: 'es-MX' },
  { label: 'Spanish (Spain)', value: 'es-ES' },
  { label: 'Spanish (Argentina)', value: 'es-AR' },
  { label: 'Spanish (Chile)', value: 'es-CL' },
  { label: 'Spanish (Colombia)', value: 'es-CO' },
  { label: 'Spanish (Peru)', value: 'es-PE' },
  { label: 'French (Canada)', value: 'fr-CA' },
  { label: 'French (France)', value: 'fr-FR' },
  { label: 'German (Germany)', value: 'de-DE' },
  { label: 'Italian (Italy)', value: 'it-IT' },
  { label: 'Dutch (Netherlands)', value: 'nl-NL' },
  { label: 'Russian (Russia)', value: 'ru-RU' },
  { label: 'Japanese (Japan)', value: 'ja-JP' },
  { label: 'Chinese (China)', value: 'zh-CN' },
  { label: 'Korean (South Korea)', value: 'ko-KR' },
  { label: 'Arabic (Saudi Arabia)', value: 'ar-SA' },
  { label: 'Turkish (Turkey)', value: 'tr-TR' },
  { label: 'Hindi (India)', value: 'hi-IN' },
  { label: 'Bengali (Bangladesh)', value: 'bn-BD' },
  { label: 'Urdu (Pakistan)', value: 'ur-PK' },
  { label: 'Vietnamese (Vietnam)', value: 'vi-VN' },
]

const initialState: SeedStatus = {
  error: null,
  result: null,
}

const AdminHome: FunctionComponent<AdminHomeProps> = ({ showToast }) => {
  const [seedStatus, setSeedStatus] = useState<SeedStatus>(initialState)
  const [industry, setIndustry] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [departments, setDepartments] = useState(3)
  const [categoryLevels, setCategoryLevels] = useState(2)
  const [products, setProducts] = useState(20)
  const [skus, setSkus] = useState(50)
  const [isFranchise, setIsFranchise] = useState(false)
  const [language, setLanguage] = useState('en')
  const [multipleSkus, setMultipleSkus] = useState(false)
  const [setupStarted, setSetupStarted] = useState(false)
  const [setupSuccess, setSetupSuccess] = useState<boolean | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const validateOptions = (): boolean => {
    if (!industry) {
      showToast({
        message: 'Please select an industry',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    if (!language) {
      showToast({
        message: 'Please select a language',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    if (departments < 1) {
      showToast({
        message: 'Number of departments must be at least 1',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    if (categoryLevels < 1) {
      showToast({
        message: 'Number of category levels must be at least 1',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    if (products < 1) {
      showToast({
        message: 'Number of products must be at least 1',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    if (skus < 1) {
      showToast({
        message: 'Number of SKUs must be at least 1',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateOptions()) {
      return
    }

    setSetupStarted(true)
    setProgress(20)

    const payload = {
      industry,
      aiPrompt,
      departments,
      categoryLevels,
      products,
      skus,
      isFranchise,
      language,
      multipleSkus,
    }

    setProgress(40)

    try {
      const res = await fetch("/_v/api/ai-easy-setup/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result: SeedResponse = await res.json()

      setSeedStatus({ error: null, result })

      setProgress(70)
      setSetupSuccess(true)
    } catch (error) {
      setSetupSuccess(false)
      setSeedStatus({ error, result: null })
    } finally {
      setProgress(100)
      setIsModalOpen(true)
    }
  }

  return (
    <Layout>
      <PageHeader title={<FormattedMessage id="admin/ai-easy-setup.title" />} />
      <PageBlock>
        <Dropdown
          label="Select Industry"
          options={industryOptions}
          value={industry}
          onChange={(e: any) => setIndustry(e.target.value)}
        />
        <Dropdown
          label="Select Language"
          options={languageOptions}
          value={language}
          onChange={(e: any) => setLanguage(e.target.value)}
        />
        <Textarea
          label="Custom AI Prompt"
          value={aiPrompt}
          onChange={(e: any) => setAiPrompt(e.target.value)}
        />
        <Input
          type="number"
          label="Number of Departments"
          value={departments}
          onChange={(e: any) => setDepartments(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Category Levels"
          value={categoryLevels}
          onChange={(e: any) => setCategoryLevels(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Number of Products"
          value={products}
          onChange={(e: any) => setProducts(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Number of SKUs"
          value={skus}
          onChange={(e: any) => setSkus(Number(e.target.value))}
        />
        <div className="flex items-center gap-2">
          <Switch checked={isFranchise} onChange={() => setIsFranchise(!isFranchise)} />
          <span>Franchise Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={multipleSkus} onChange={() => setMultipleSkus(!multipleSkus)} />
          <span>Enable Multiple SKUs per Product</span>
        </div>
        <Button onClick={handleSubmit}>Generate Setup</Button>
        {setupStarted && <Progress type="line" percent={progress} />}
        <ModalDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          confirmation={{ label: "OK", onClick: () => setIsModalOpen(false) }}
        >
          {setupSuccess ? <IconSuccess size={40} color="green" /> : <IconFailure size={40} color="red" />}
          <p>{setupSuccess ? "Setup completed successfully!" : "Setup failed. Please try again."}</p>
        </ModalDialog>
      </PageBlock>
    </Layout>
  )
}

const AdminWithToast = withToast(AdminHome)

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <ToastProvider positioning="window">
      <AdminWithToast />
    </ToastProvider>
  )
}
