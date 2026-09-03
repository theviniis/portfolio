import axios from 'axios'
import type { SendContactSchemaType } from './schemas'
import { toast } from 'sonner'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export const sendContactEmail = async (
  data: SendContactSchemaType,
  t: (key: string) => string
) => {
  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, data)

    if (response.status !== 200) {
      throw new Error(t('toast.sendFail'))
    }

    toast.success(t('toast.sendSuccess'), {
      position: 'bottom-right'
    })
  } catch {
    toast.error(t('toast.sendError'), {
      position: 'bottom-right'
    })
  }
}
