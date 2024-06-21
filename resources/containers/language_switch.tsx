import { useForm } from '@inertiajs/react'

import { Select } from '#containers/ui/select'
import { tuyau } from '#resources/core/tuyau'
import { Loader } from '#components/ui/loader'

import useTranslation from '#packages/inertia-i18n/src/hook'

export function LanguageSwitch() {
  const { setLocale, currentLocale } = useTranslation()

  const { data, setData, errors, processing, post } = useForm({
    language: currentLocale(),
  })

  function handleChange() {
    if (processing) return

    post(tuyau.$url('language.update', { params: { locale: data.language } }))
    setLocale(data.language)
  }

  if (processing)
    return (
      <div className="flex items-center justify-center min-w-[140px]">
        <Loader />
      </div>
    )

  return (
    <form onChange={handleChange}>
      <Select
        hideSelected
        className="min-w-[140px]"
        name="language"
        options={[
          {
            label: (
              <span className="inline-flex items-center mt-1">
                🇬🇧 <span className="ml-2 font-medium mb-1">English</span>
              </span>
            ),
            value: 'en',
          },
          {
            label: (
              <span className="inline-flex items-center mt-1">
                🇫🇷 <span className="ml-2 font-medium mb-1">Français</span>
              </span>
            ),
            value: 'fr',
          },
        ]}
        disabled={processing}
        {...{ data, setData, errors }}
      />
    </form>
  )
}
