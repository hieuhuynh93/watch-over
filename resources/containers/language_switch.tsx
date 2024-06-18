import type { ReactNode } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '#components/ui/button'
import { cn } from '#resources/lib/utils'

import { Label } from '#components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '#components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '#components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'

export function LanguageSwitch() {
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
  ] as const

  const { data, setData } = useForm({
    language: 'en',
  })

  return (
    <form className="space-y-6">
      <Label>Language</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-[200px] justify-between'
              // !field.value && 'text-muted-foreground'
            )}
          >
            {/* {data['language']
                  ? languages.find((language) => language.value === field.value)?.label
                  : 'Select language'} */}
            Select language
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  value={language.label}
                  key={language.value}
                  onSelect={(value) => setData('language', value)}
                  value={data.language}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      language.value === data.language ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit">Submit</Button>
    </form>
  )
}
