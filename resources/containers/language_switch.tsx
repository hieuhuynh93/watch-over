import { useForm, usePage } from '@inertiajs/react'
import i18next from 'i18next'

import { Select } from '#containers/ui/select'
import { tuyau } from '#resources/core/tuyau'
import { Loader } from '#components/ui/loader'

export function LanguageSwitch() {
  const {
    props: { locale },
  } = usePage()

  const { data, setData, errors, processing, post } = useForm({
    language: locale,
  })

  function handleChange() {
    if (processing) return

    post(tuyau.$url('language.update', { params: { locale: data.language as string } }))
    i18next.changeLanguage(data.language as string)
    document.documentElement.setAttribute('lang', data.language as string)
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
